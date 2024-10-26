import { Controller } from "./Controller";

export class Clock {
  // tick is .0
  // tock is .5
  public count = 0;
  reset() {
    this.count = 0;
  }
  always(ctrl: Controller) {
    if (!ctrl.hlt) this.count += 0.5;
    // console.log(`clk.* ${this.count} ${this.isTick ? "tick" : ""} ${this.isTock ? "tock" : ""}`);
  }
  get isTick() {
    return this.count % 1 == 0;
  }
  get isTock() {
    return this.count % 1 == 0.5;
  }
}
