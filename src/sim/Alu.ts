import { combineBits, getBit, isOn, setBitTo } from "./Bits";
import { Bus } from "./Bus";
import { Clock } from "./Clock";
import { Controller } from "./Controller";

enum ALUFLG {
  Z,
  C,
  P,
  S,
}

enum ALUOP {
  ADD = 0b00000,
  ADC = 0b00001,
  SUB = 0b00010,
  SBB = 0b00011,
  ANA = 0b00100,
  XRA = 0b00101,
  ORA = 0b00110,
  CMP = 0b00111,
  RLC = 0b01000,
  RRC = 0b01001,
  RAL = 0b01010,
  RAR = 0b01011,
  DAA = 0b01100, // unsupported
  CMA = 0b01101,
  STC = 0b01110,
  CMC = 0b01111,
  INR = 0b10000,
  DCR = 0b10001,
}

export class Alu {
  out = 0;
  flags = 0;
  carry = 0;
  flg = 0;
  acc = 0;
  act = 0;
  tmp = 0;

  always(clk: Clock, rst: number, ctrl: Controller, bus: Bus) {
    if (rst) {
      this.acc = 0;
      this.act = 0;
      this.tmp = 0;
      this.carry = 0;
    } else if (clk.isTick) {
      console.assert(ctrl.alu_a_we + ctrl.alu_a_restore + ctrl.alu_cs <= 1, "%o", {
        ctrl,
        msg: `Alu.always cant have more than 1 of we, restore or cs`,
      });
      if (ctrl.alu_a_we) {
        this.acc = bus.value;
      } else if (ctrl.alu_a_restore) {
        this.acc = this.act;
      } else if (ctrl.alu_cs) {
        const calc = (v: number) => {
          this.acc = v & 0xff;
          this.carry = v > 0b11111111 ? 1 : 0;
        };
        switch (ctrl.alu_op) {
          case ALUOP.ADD:
            calc(this.acc + this.tmp);
            break;
          case ALUOP.ADC:
            calc(this.acc + this.tmp + isOn(this.flg, ALUFLG.C));
            break;
          case ALUOP.SUB:
            calc(this.acc - this.tmp);
            break;
          case ALUOP.SBB:
            calc(this.acc - this.tmp - isOn(this.flg, ALUFLG.C));
            break;
          case ALUOP.ANA:
            calc(this.acc & this.tmp);
            break;
          case ALUOP.XRA:
            calc(this.acc ^ this.tmp);
            break;
          case ALUOP.ORA:
            calc(this.acc | this.tmp);
            break;
          case ALUOP.CMP:
            this.act = this.acc - this.tmp;
            break;
          case ALUOP.RLC:
            this.carry = getBit(this.acc, 7);
            this.acc = this.acc << 1;
            break;
          case ALUOP.RRC:
            this.carry = getBit(this.acc, 0);
            this.acc = this.acc >> 1;
            break;
          case ALUOP.RAL:
            this.carry = getBit(this.acc, 7);
            this.acc = (this.acc << 1) | (getBit(this.flg, ALUFLG.C) & 0xff);
            break;
          case ALUOP.RAR:
            this.carry = getBit(this.acc, 0);
            this.acc = (this.acc >> 1) | setBitTo(0, ALUFLG.C, getBit(this.flg, ALUFLG.C));
            break;
          case ALUOP.CMA:
            this.acc = ~this.acc;
            break;
          case ALUOP.STC:
            this.carry = 1;
            break;
          case ALUOP.CMC:
            this.carry = ~getBit(this.flg, ALUFLG.C);
            break;
          case ALUOP.INR:
            this.acc++;
            break;
          case ALUOP.DCR:
            this.acc--;
            break;
        }
        if (ctrl.alu_a_store) {
          this.act = this.acc;
        }
        if (ctrl.alu_tmp_we) {
          this.tmp = bus.value;
        }
      }
    } else if (clk.isTock) {
      // update flags
      if (ctrl.alu_flags_we) {
        this.flg = bus.value;
      } else if (ctrl.alu_cs) {
        switch (ctrl.alu_op) {
          case ALUOP.ADD:
          case ALUOP.ADC:
          case ALUOP.SUB:
          case ALUOP.SBB:
          case ALUOP.ANA:
          case ALUOP.XRA:
          case ALUOP.ORA:
            this.flg = combineBits([this.flg_c, this.flg_z, this.flg_s, this.flg_p]);
            break;
          case ALUOP.CMP:
            this.flg = setBitTo(this.flg, ALUFLG.Z, this.act == 0 ? 1 : 0);
            break;
          case ALUOP.INR:
          case ALUOP.DCR:
            this.flg = setBitTo(this.flg, ALUFLG.Z, this.flg_z);
            this.flg = setBitTo(this.flg, ALUFLG.S, this.flg_s);
            this.flg = setBitTo(this.flg, ALUFLG.P, this.flg_p);
            break;
          case ALUOP.RLC:
          case ALUOP.RRC:
          case ALUOP.RAL:
          case ALUOP.RAR:
          case ALUOP.STC:
          case ALUOP.CMC:
            this.flg = setBitTo(this.flg, ALUFLG.C, this.flg_c);
            break;
        }
      }
    } else console.error(`clk must be tick or tock`);

    this.out = this.acc;
    this.flags = this.flg;
  }
  get flg_c() {
    return this.carry == 1 ? 1 : 0;
  }
  get flg_z() {
    return this.acc == 0 ? 1 : 0;
  }
  get flg_s() {
    return isOn(this.acc, 7);
  }
  get flg_p() {
    return ~(this.acc ^ this.acc);
  }
}
