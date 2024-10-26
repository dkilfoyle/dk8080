import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller } from "./Controller";

export class Memory {
  ram = new Uint8Array(8 * 255);
  mar = 0;
  out = 0;

  load(bytes: number[]) {
    for (let i = 0; i < bytes.length; i++) {
      this.ram[i] = bytes[i] & 0xff;
    }
  }

  always(clk: Clock, rst: number, ctrl: Controller, bus: Bus) {
    if (rst) {
      this.mar = 0;
    } else if (clk.isTick) {
      console.assert(!(ctrl.mem_mar_we && ctrl.mem_we), "%o", { ctrl, msg: "Memory.always has both mar_we and we" });
      if (ctrl.mem_mar_we) {
        this.mar = bus.value;
        // console.log(`mem.tick write bus => mar = ${bus.value}`);
      }
      if (ctrl.mem_we) {
        this.ram[this.mar] = bus.value;
        // console.log(`mem.tick write bus => ram[${this.mar}] = ${bus.value}`);
      }
    }

    // always @(*)
    this.out = this.ram[this.mar];
    // console.log(`mem.* mem.out = ram[mar=${this.mar}] = ${this.ram[this.mar]}`);
  }
}
