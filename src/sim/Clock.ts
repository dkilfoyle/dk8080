import { Controller } from "./Controller";

export class Clock {
  // tick is .0
  // tock is .5
  public count = 0.5;
  reset() {
    this.count = 0.5;
  }
  always(ctrl: Controller) {
    if (!ctrl.hlt) this.count += 0.5;
  }
  get isTick() {
    return this.count % 1 == 0;
  }
  get isTock() {
    return this.count % 1 == 0.5;
  }
}
