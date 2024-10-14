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
      if (ctrl.mem_mar_we) {
        this.mar = bus.value;
      }
      if (ctrl.mem_we) {
        this.ram[this.mar] = bus.value;
      }
    }

    // always @(*)
    this.out = this.ram[this.mar];
  }
}
