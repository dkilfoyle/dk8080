import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller } from "./Controller";

export const getTStates = (ir: number) => {
  const ir8 = ir.toString(8).padStart(3, "0");
  switch (true) {
    case ir8.match(/1[0-7]+6/) != null:
      return 4;
    case ir8.match(/16[0-7]+/) != null:
      return 4;
    case ir8.match(/1[0-7]+[0-7]+/) != null:
      return 3;
    case ir8 == "066":
      return 7;
    case ir8.match(/0[0-7]+6/) != null:
      return 5;
    case ir8 == "064":
      return 6;
    case ir8.match(/0[0-7]+4/) != null && ir8.match(/0[0-7]+5/) != null:
      return 5;
    case ir8 == "001":
    case ir8 == "021":
    case ir8 == "041":
    case ir8 == "061":
      return 9;
    case ir8.match(/0[0-7]+7/) != null:
      return 3;
    case ir8.match(/3[0-7]+6/) != null:
      return 5;
    case ir8.match(/3[0-7]+2/) != null:
      return 8;
    case ir8 == "303":
      return 8;
    case ir8.match(/3[0-7]+4/) != null:
      return 15;
    case ir8 == "315":
      return 15;
    case ir8.match(/3[0-7]+0/) != null:
      return 15;
    case ir8 == "311":
      return 15;
    case ir8 == "323":
      return 3;
    default:
      console.error(`Get t state unknown for ${ir}`);
      return 3;
  }
};

export class InstructionRegister {
  out = 0;
  always(clk: Clock, rst: number, ctrl: Controller, bus: Bus) {
    if (rst) {
      this.out = 0;
    } else if (clk.isTick) {
      if (ctrl.ir_we) {
        this.out = bus.value;
        console.log(`IR = 0o${this.out.toString(8).padStart(3, "0")} / 0x${this.out.toString(16).padStart(2, "0").toUpperCase()}`);
      }
    }
  }
}
