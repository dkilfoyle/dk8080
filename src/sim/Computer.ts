import { Alu } from "./Alu";
import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller } from "./Controller";
import { InstructionRegister } from "./InstructionRegister";
import { Memory } from "./Memory";
import { Registers } from "./Registers";

export class Computer {
  clk = new Clock();
  ctrl = new Controller();
  regs = new Registers();
  ir = new InstructionRegister();
  alu = new Alu();
  bus = new Bus();
  mem = new Memory();
  rst = 0;
  out = 0;

  constructor() {
    this.mem.load([
      // lxi sp, $f0
      // 0x31, 0xf0, 0x00,
      // mvi a, $1
      0x3e, 0x01,
      // mvi b, $0
      0x06, 0x00,
      // loop
      // out
      0xd3,
    ]);
  }

  always() {
    if (this.rst) {
      this.out = 0;
    } else if (this.clk.isTick) {
      this.out = this.alu.out;
    }

    this.ctrl.always(this.clk, this.rst, this.ir, this.alu); // decode ir => controls
    // stages 0-2 load ir with ram[pc] and increment pc
    // stage 0: pc => mar
    //   REG_RD_SEL = REG_PC       Select PC
    //   REG_OE                    PC => Bus
    //   MEM_MAR_WE                Bus => mar
    // stage 1: ram[mar] => ir
    //   MEM_OE                    mem[mar] => bus
    //   IR_WE                     bus => ir
    // stage 2: pc++
    //   REG_WR_SEL = REG_PC
    //   REG_EXT = INC

    // always @(*)

    // write bus to reg if reg_we on tick
    // store selected reg to regs.out
    this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg

    // write bus to mar (if mem_mar_we) or ram[mar] (if mem_we) on tick
    // store ram[mar] in mem.out
    this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]

    // write bus to ir.out on tick if ir_we
    this.ir.always(this.clk, this.rst, this.ctrl, this.bus); // bus -> ir

    // write bus to acc or calculate acc on tick
    // update flags on tock
    // store acc to alu.out
    this.alu.always(this.clk, this.rst, this.ctrl, this.bus);

    // copy alu.out or mem.out or regs.out to bus
    this.bus.always(this.ctrl, this.alu, this.mem, this.regs);

    this.clk.always(this.ctrl);
  }
}
