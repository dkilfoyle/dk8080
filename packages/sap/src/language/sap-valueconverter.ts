import { CstNode, DefaultValueConverter, GrammarAST, ValueType } from "langium";

export class SapValueConverter extends DefaultValueConverter {
  override runConverter(rule: GrammarAST.AbstractRule, input: string, cstNode: CstNode): ValueType {
    if (rule.name == "INT") {
      return input.endsWith("h") ? parseInt(input.slice(0, -1), 16) : parseInt(input);
    } else {
      return super.runConverter(rule, input, cstNode);
    }
  }
}
