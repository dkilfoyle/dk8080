import type { ValidationAcceptor, ValidationChecks } from "langium";
import type { Argument, SapAstType, Statement } from "./generated/ast.js";
import type { SapServices } from "./sap-module.js";
import { argsLookup } from "./opcodes.js";

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: SapServices) {
  const registry = services.validation.ValidationRegistry;
  const validator = services.validation.SapValidator;
  const checks: ValidationChecks<SapAstType> = {
    Statement: validator.checkValidStatement,
  };
  registry.register(checks, validator);
}

const isEmpty = (arg?: Argument) => {
  return arg == undefined;
};

const countArgs = (s: Statement) => {
  if (isEmpty(s.arg2)) {
    return isEmpty(s.arg1) ? 0 : 1;
  } else return 2;
};

/**
 * Implementation of custom validations.
 */
export class SapValidator {
  checkValidStatement(s: Statement, accept: ValidationAcceptor): void {
    const eargs = argsLookup[s.instr.toUpperCase()];
    if (!eargs) return accept("error", `Unknown instruction ${s.instr}`, { node: s, property: "instr" }); // this shouldn't happen

    // console.log(s);

    const expectedNumArgs = Number(eargs.arg1.argType != "") + Number(eargs.arg2.argType != "");
    const gotNumArgs = countArgs(s);
    if (gotNumArgs != expectedNumArgs) {
      if (gotNumArgs == 2) return accept("error", `${s.instr} expects ${expectedNumArgs} args`, { node: s, property: "arg2" });
      if (gotNumArgs == 1) return accept("error", `${s.instr} expects ${expectedNumArgs} args`, { node: s, property: "arg1" });
      if (gotNumArgs == 0) return accept("error", `${s.instr} expects ${expectedNumArgs} args`, { node: s });
    }

    if (s.arg1?.name) {
      if (!(eargs.arg1.argType == "addr") && !eargs.arg1.allowed.has(s.arg1.name.toUpperCase()))
        return accept("error", `${s.instr} argument 1 expects ${eargs.arg1.argType}`, { node: s, property: "arg1" });
    }

    if (s.arg1?.number) {
      if (!eargs.arg1.argType.includes("imm"))
        return accept("error", `${s.instr} argument 1 expects ${eargs.arg1.argType}`, { node: s, property: "arg1" });
    }

    if (s.arg2?.name) {
      if (!eargs.arg2.allowed.has(s.arg2.name.toUpperCase()))
        return accept("error", `${s.instr} argument 2 expects ${eargs.arg2.argType}`, { node: s, property: "arg2" });
    }

    if (s.arg2?.number) {
      if (!eargs.arg2.argType.includes("imm"))
        return accept("error", `${s.instr} argument 2 expects ${eargs.arg2.argType}`, { node: s, property: "arg2" });
    }
  }
}
