import { AbstractSignatureHelpProvider } from "langium/lsp";
import { SapServices } from "./sap-module.js";
import { AstNode, LangiumDocument, MaybePromise, CstUtils, DocumentationProvider, CommentProvider } from "langium";
import { SignatureHelp, SignatureHelpParams, SignatureInformation, ParameterInformation, SignatureHelpOptions } from "vscode-languageserver";
import { isInstruction, isOperation } from "./generated/ast.js";
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

  override provideSignatureHelp(document: LangiumDocument, params: SignatureHelpParams): MaybePromise<SignatureHelp | undefined> {
    const cst = document.parseResult.value.$cstNode;
    if (cst) {
      const curOffset = document.textDocument.offsetAt(params.position);
      const nodeBefore = CstUtils.findLeafNodeBeforeOffset(cst, curOffset)?.astNode;
      console.log(nodeBefore);
      if (params.context?.triggerCharacter == "\n") {
        this.currentSignature = undefined;
        return undefined;
      } else if (params.context?.triggerCharacter == "," && isInstruction(nodeBefore)) {
        const paramNum = nodeBefore.$cstNode!.text.includes(",") ? 1 : 0;
        this.currentSignature!.activeParameter = paramNum;
        return this.currentSignature;
      } else if (isOperation(nodeBefore)) {
        const sig = this.getSignatureFromElement(nodeBefore);
        return sig;
      } else return this.currentSignature;
    }
    // const nodeAt = CstUtils.findDeclarationNodeAtOffset(cst, curOffset)?.astNode;
    return undefined;
  }

  protected override getSignatureFromElement(element: AstNode): MaybePromise<SignatureHelp | undefined> {
    if (isOperation(element)) {
      const op = argsLookup[element.name.toUpperCase()];
      const args = [op.arg1.argType, op.arg2.argType].filter((x) => x != "");
      let title = element.name + " ";
      const params = args.map((arg, i) => {
        const start = title.length;
        title += arg;
        const end = title.length;
        if (i < args.length - 1) title += ", ";
        return ParameterInformation.create([start, end]);
      });
      const sig = SignatureInformation.create(title, instrHelp[element.name.toUpperCase()], ...params);
      const siginfo = { signatures: [sig], activeParameter: 0, activeSignature: 0 };
      this.currentSignature = siginfo;
      return siginfo;
    }
    return undefined;
  }

  override get signatureHelpOptions(): SignatureHelpOptions {
    return {
      triggerCharacters: [" "],
      retriggerCharacters: [",", "\n"],
    };
  }
}
