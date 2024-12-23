import type { ValidationAcceptor, ValidationChecks } from "langium";
import type { Argument, Instruction, SapAstType } from "./generated/ast.js";
import type { SapServices } from "./sap-module.js";
import { argsLookup } from "./opcodes.js";

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: SapServices) {
  const registry = services.validation.ValidationRegistry;
  const validator = services.validation.SapValidator;
  const checks: ValidationChecks<SapAstType> = {
    Instruction: validator.checkValidInstruction,
  };
  registry.register(checks, validator);
}

const isEmpty = (arg?: Argument) => {
  return arg == undefined;
};

const countArgs = (s: Instruction) => {
  if (isEmpty(s.arg2)) {
    return isEmpty(s.arg1) ? 0 : 1;
  } else return 2;
};

/**
 * Implementation of custom validations.
 */
export class SapValidator {
  checkValidInstruction(instr: Instruction, accept: ValidationAcceptor): void {
    const eargs = argsLookup[instr.op?.name.toUpperCase()];
    if (!eargs) return accept("error", `Unknown instruction ${instr.op}`, { node: instr, property: "op" }); // this shouldn't happen

    // console.log(s);

    const expectedNumArgs = Number(eargs.arg1.argType != "") + Number(eargs.arg2.argType != "");
    const gotNumArgs = countArgs(instr);
    if (gotNumArgs != expectedNumArgs) {
      if (gotNumArgs == 2) return accept("error", `${instr.op.name} expects ${expectedNumArgs} args`, { node: instr, property: "arg2" });
      if (gotNumArgs == 1) return accept("error", `${instr.op.name} expects ${expectedNumArgs} args`, { node: instr, property: "arg1" });
      if (gotNumArgs == 0) return accept("error", `${instr.op.name} expects ${expectedNumArgs} args`, { node: instr, property: "op" });
    }

    if (instr.arg1?.name) {
      if (!(eargs.arg1.argType == "addr") && !eargs.arg1.allowed.has(instr.arg1.name.toUpperCase()))
        return accept("error", `${instr.op.name} argument 1 expects ${eargs.arg1.argType}`, { node: instr, property: "arg1" });
    }

    if (instr.arg1?.number) {
      if (!eargs.arg1.argType.includes("imm"))
        return accept("error", `${instr.op.name} argument 1 expects ${eargs.arg1.argType}`, { node: instr, property: "arg1" });
      if ((eargs.arg1.argType == "imm8" && instr.arg1.number > 0xff) || (eargs.arg1.argType == "imm16" && instr.arg1.number > 0xffff))
        return accept("error", `Argument 1 out of range for ${eargs.arg1.argType}`, { node: instr, property: "arg1" });
    }

    if (instr.arg2?.name) {
      if (!eargs.arg2.allowed.has(instr.arg2.name.toUpperCase()))
        return accept("error", `${instr.op.name} argument 2 expects ${eargs.arg2.argType}`, { node: instr, property: "arg2" });
    }

    if (instr.arg2?.number) {
      if (!eargs.arg2.argType.includes("imm"))
        return accept("error", `${instr.op.name} argument 2 expects ${eargs.arg2.argType}`, { node: instr, property: "arg2" });
      if ((eargs.arg2.argType == "imm8" && instr.arg2.number > 0xff) || (eargs.arg2.argType == "imm16" && instr.arg2.number > 0xffff))
        return accept("error", `Argument 2 out of range for ${eargs.arg1.argType}`, { node: instr, property: "arg2" });
    }
  }
}
