import { AbstractSignatureHelpProvider } from "langium/lsp";
import { SapServices } from "./sap-module.js";
import { AstNode, LangiumDocument, MaybePromise, CstUtils, DocumentationProvider, CommentProvider } from "langium";
import {
  CancellationToken,
  SignatureHelp,
  SignatureHelpParams,
  SignatureInformation,
  ParameterInformation,
  SignatureHelpOptions,
} from "vscode-languageserver";
import * as _ from "lodash";
import { isStatement } from "./generated/ast.js";
import { argsLookup, instrHelp } from "./opcodes.js";

export class SapSignatureHelpProvider extends AbstractSignatureHelpProvider {
  documentationProvider: DocumentationProvider;
  commentProvider: CommentProvider;
  currentSignature: SignatureHelp | undefined;

  constructor(services: SapServices) {
    super();
    this.documentationProvider = services.documentation.DocumentationProvider;
    this.commentProvider = services.documentation.CommentProvider;
  }

  override provideSignatureHelp(
    document: LangiumDocument,
    params: SignatureHelpParams,
    cancelToken = CancellationToken.None
  ): MaybePromise<SignatureHelp | undefined> {
    const cst = document.parseResult.value.$cstNode;
    if (cst) {
      const curOffset = document.textDocument.offsetAt(params.position);
      const nodeBefore = CstUtils.findLeafNodeBeforeOffset(cst, curOffset)?.astNode;
      if (params.context?.triggerCharacter == "\n") {
        this.currentSignature = undefined;
        return undefined;
      }
      if (isStatement(nodeBefore)) {
        const sig = this.getSignatureFromElement(nodeBefore, cancelToken);
        return sig;
      } else return this.currentSignature;
    }
    // const nodeAt = CstUtils.findDeclarationNodeAtOffset(cst, curOffset)?.astNode;
    return undefined;
  }

  protected override getSignatureFromElement(element: AstNode, cancelToken: CancellationToken): MaybePromise<SignatureHelp | undefined> {
    if (isStatement(element)) {
      const paramNum = element.$cstNode!.text.includes(",") ? 1 : 0;
      const op = argsLookup[element.instr.toUpperCase()];
      const args = [op.arg1.argType, op.arg2.argType].filter((x) => x != "");
      let title = element.instr + " ";
      const params = args.map((arg, i) => {
        const start = title.length;
        title += arg;
        const end = title.length;
        if (i < args.length - 1) title += ", ";
        return ParameterInformation.create([start, end]);
      });
      const sig = SignatureInformation.create(title, instrHelp[element.instr.toUpperCase()], ...params);
      const siginfo = { signatures: [sig], activeParameter: paramNum, activeSignature: 0 };
      this.currentSignature = siginfo;
      return siginfo;
    }
  }

  override get signatureHelpOptions(): SignatureHelpOptions {
    return {
      triggerCharacters: [" "],
      retriggerCharacters: [",", "\n"],
    };
  }
}
