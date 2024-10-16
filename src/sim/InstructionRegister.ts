import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller } from "./Controller";

export class InstructionRegister {
  out = 0;
  always(clk: Clock, rst: number, ctrl: Controller, bus: Bus) {
    if (rst) {
      this.out = 0;
    } else if (clk.isTick) {
      if (ctrl.ir_we) {
        this.out = bus.value;
        console.log(`ir.tick bus => ir.out = ${this.out}`);
      }
    }
  }
}
