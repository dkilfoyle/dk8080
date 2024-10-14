import { Clock } from "./Clock";
import { Computer } from "./Computer";

const DISPLAY = 32;
const HLT = 31;
const ALU_CS = 30;
const ALU_FLAGS_WE = 29;
const ALU_A_WE = 28;
const ALU_A_STORE = 27;
const ALU_A_RESTORE = 26;
const ALU_TMP_WE = 25;
const ALU_OP4 = 24;
const ALU_OP0 = 20;
const ALU_OE = 19;
const ALU_FLAGS_OE = 18;
const REG_RD_SEL4 = 17;
const REG_RD_SEL0 = 13;
const REG_WR_SEL4 = 12;
const REG_WR_SEL0 = 8;
const REG_EXT1 = 7;
const REG_EXT0 = 6;
const REG_OE = 5;
const REG_WE = 4;
const MEM_WE = 3;
const MEM_MAR_WE = 2;
const MEM_OE = 1;
const IR_WE = 0;

const REG_INC = 0b01;
const REG_DEC = 0b10;
const REG_INC2 = 0b11;
const REG_BC = 0b10000;
const REG_BC_B = 0b00000;
const REG_BC_C = 0b00001;
const REG_DE = 0b10010;
const REG_DE_D = 0b00010;
const REG_DE_E = 0b00011;
const REG_HL = 0b10100;
const REG_HL_H = 0b00100;
const REG_HL_L = 0b00101;
const REG_WZ = 0b10110;
const REG_WZ_W = 0b00110;
const REG_WZ_Z = 0b00111;
const REG_PC = 0b11000;
const REG_PC_P = 0b01000;
const REG_PC_C = 0b01001;
const REG_SP = 0b11010;
const REG_SP_S = 0b01010;
const REG_SP_P = 0b01011;

export class Controller {
  ctrl_word = 0;
  stage = 0;
  stage_rst = false;
  constructor(public computer: Computer) {}

  setControl(bit: number | number[], value = 1) {
    const [hi, lo] = Array.isArray(bit) ? bit : [bit, bit];
    for (let i = lo; i <= hi; i++) {
      if (isOn(value, i - lo)) this.ctrl_word |= 1 << i;
      else this.ctrl_word &= ~(1 << i);
    }
  }

  always(clk: Clock, rst: boolean, opcode: number, flags: number) {
    // always @(negedge clk, posedge rst)
    if (clk.isTock) {
      if (rst) {
        this.stage = 0;
      } else {
        if (this.stage_rst) this.stage = 0;
        else this.stage++;
      }
    }

    // always @(*)
    this.ctrl_word = 0;
    this.stage_rst = false;

    // fetch TState 0
    if (this.stage == 0) {
      // load PC into MAR
      this.setControl([REG_RD_SEL4, REG_RD_SEL0], REG_PC); // read from registers[PC]
      this.setControl(REG_OE); // output selected register to bus
      this.setControl(MEM_MAR_WE); // read value on bus into MAR
    }
  }

  get hlt() {
    return isOn(this.ctrl_word, HLT);
  }
}
