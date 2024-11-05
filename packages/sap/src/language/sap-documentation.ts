import { AstNode, DocumentationProvider } from "langium";
import { isInstruction, isStatement } from "./generated/ast.js";
import { instrHelp } from "./opcodes.js";

export class SapDocumentationProvider implements DocumentationProvider {
  getDocumentation(node: AstNode) {
    let instr = "";
    if (isInstruction(node)) {
      instr = node.name as string;
    } else if (isStatement(node)) {
      instr = node.instr.name as string;
    }
    if (instr) return `${instrHelp[instr.toUpperCase()]}`;
    return "";
  }
}
