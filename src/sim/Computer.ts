import { Alu } from "./Alu";
import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller, CTRL } from "./Controller";
import { InstructionRegister } from "./InstructionRegister";
import { Memory } from "./Memory";
import { Registers } from "./Registers";

export interface ComputerState {
  clkCount: number;
  clkState: string;
  ctrl_word: number;
  regs: number[];
  ir: number;
  alu_acc: number;
  alu_carry: number;
  alu_act: number;
  alu_tmp: number;
  alu_flg: number;
  bus: number;
  mem: number[];
  mar: number;
  stage: number;
  stage_max: number;
}

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
  states: ComputerState[] = [];

  constructor(program: number[]) {
    this.mem.load(program);
    this.ctrl.always(this.clk, this.rst, this.ir, this.alu); // decode ir => controls
  }

  run(max = 1000) {
    let i = 0;
    while (i < max && !(this.ctrl.getControl(CTRL.HLT) && !this.ctrl.getControl(CTRL.REG_EXT0))) {
      this.always();
      i++;
    }
  }

  always() {
    if (this.rst) {
      this.out = 0;
      this.ctrl.always(this.clk, this.rst, this.ir, this.alu); // decode ir => controls
    } else if (this.clk.isTick && this.ctrl.hlt && this.ctrl.reg_ext == 1) {
      this.out = this.alu.out;
      console.log(`Out @ clk ${this.clk.count} = ${this.out} / ${this.out.toString(2)}`);
    }

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
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs); // copy reg to bus
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // if reg_we read bus(Rs) to Rd ie MOV Rd, Rs
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); //
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
    } else if (this.ctrl.alu_oe || this.ctrl.alu_flags_oe) {
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
    } else if (this.ctrl.mem_oe) {
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
    } else {
      // nothing written to bus so order doesnt matter
      this.mem.always(this.clk, this.rst, this.ctrl, this.bus); // bus <=> mem[mar]
      this.bus.always(this.ctrl, this.alu, this.mem, this.regs);
      this.alu.always(this.clk, this.rst, this.ctrl, this.bus);
      this.regs.always(this.clk, this.rst, this.ctrl, this.bus); // select reg
    }

    this.ir.always(this.clk, this.rst, this.ctrl, this.bus); // bus -> ir
    this.ctrl.always(this.clk, this.rst, this.ir, this.alu); // decode ir => controls

    this.saveState();
    this.clk.always(this.ctrl);
  }
  saveState() {
    this.states.push({
      alu_acc: this.alu.acc,
      alu_act: this.alu.act,
      alu_carry: this.alu.carry,
      alu_flg: this.alu.flags,
      alu_tmp: this.alu.tmp,
      bus: this.bus.value,
      clkCount: this.clk.count,
      clkState: this.clk.isTick ? "tick" : "tock",
      ctrl_word: this.ctrl.ctrl_word,
      ir: this.ir.out,
      mem: [...this.mem.ram.slice(0, 255).values()],
      mar: this.mem.mar,
      regs: [...this.regs.registers.slice(0).values()],
      stage: this.ctrl.stage,
      stage_max: this.ctrl.stage_max,
    });
  }
}
