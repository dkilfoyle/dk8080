import { Clock } from "./Clock";
import { Controller } from "./Controller";

export class Computer {
  clock = new Clock();
  controller = new Controller(this);
  rest = false;

  always() {
    this.clock.always(this.controller.hlt);
  }
}
