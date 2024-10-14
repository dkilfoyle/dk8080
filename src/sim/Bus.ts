import { Alu } from "./Alu";
import { Controller } from "./Controller";
import { Memory } from "./Memory";
import { Registers } from "./Registers";

export class Bus {
  value = 0;

  always(ctrl: Controller, alu: Alu, mem: Memory, regs: Registers) {
    // regardless of tick/tock
    this.value = 0;
    if (ctrl.alu_oe) this.value = alu.out;
    else if (ctrl.mem_oe) this.value = mem.out;
    else if (ctrl.reg_oe) this.value = regs.out;
    else if (ctrl.alu_flags_oe) this.value = alu.flags;
  }
}
