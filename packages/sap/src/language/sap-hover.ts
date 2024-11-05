import { AstNode, DocumentationProvider, LangiumDocument, MaybePromise } from "langium";
import { Hover, HoverParams } from "vscode-languageclient";
import { AstNodeHoverProvider, LangiumServices } from "langium/lsp";
import { isInstruction } from "./generated/ast.js";
import { CstUtils } from "langium";

export class SapHoverProvider extends AstNodeHoverProvider {
  documentationProvider: DocumentationProvider;

  constructor(services: LangiumServices) {
    super(services);
    this.documentationProvider = services.documentation.DocumentationProvider;
  }

  override getHoverContent(document: LangiumDocument, params: HoverParams): MaybePromise<Hover | undefined> {
    const rootNode = document.parseResult?.value?.$cstNode;
    if (rootNode) {
      const offset = document.textDocument.offsetAt(params.position);
      const cstNode = CstUtils.findLeafNodeBeforeOffset(rootNode, offset);
      if (isInstruction(cstNode?.astNode)) return this.getAstNodeHoverContent(cstNode.astNode);
      if (cstNode && cstNode.offset + cstNode.length > offset) {
        const targetNode = this.references.findDeclaration(cstNode);
        if (targetNode) {
          return this.getAstNodeHoverContent(targetNode);
        }
      }
    }
    return undefined;
  }

  protected getAstNodeHoverContent(node: AstNode): Hover | undefined {
    if (isInstruction(node)) {
      const docInfo = this.documentationProvider.getDocumentation(node);

      let hover = `${node.name.toUpperCase()}`;
      if (docInfo) hover += "\n\n" + docInfo; //\n***\n\n";

      if (hover.length > 0) {
        return {
          contents: {
            kind: "markdown",
            value: hover,
          },
        };
      }
    }
    return undefined;
  }
}
