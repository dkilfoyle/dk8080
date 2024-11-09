import { AstNode, DocumentationProvider } from "langium";
import { isInstruction, isOperation } from "./generated/ast.js";
import { instrHelp } from "./opcodes.js";

export class SapDocumentationProvider implements DocumentationProvider {
  getDocumentation(node: AstNode) {
    let instr = "";
    if (isOperation(node)) {
      instr = node.name as string;
    } else if (isInstruction(node)) {
      instr = node.op.name as string;
    }
    if (instr) return `${instrHelp[instr.toUpperCase()]}`;
    return "";
  }
}
