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

    // which component is writing to the bus - do this first so that the other components reading the bus get the uptodate value
    if (this.ctrl.reg_oe) {
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
      this.ir.always(this.clk, this.rst, this.ctrl, this.bus); // bus -> ir
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
    } else if (this.ctrl.alu_oe || this.ctrl.alu_flags_oe) {
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
      this.ir.always(this.clk, this.rst, this.ctrl, this.bus); // bus -> ir
    } else if (this.ctrl.mem_oe) {
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
      this.ir.always(this.clk, this.rst, this.ctrl, this.bus); // bus -> ir
    }

    this.clk.always(this.ctrl);
  }
}
