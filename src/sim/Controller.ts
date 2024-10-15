import { Alu } from "./Alu";
import { getBits, isOn, setBits } from "./Bits";
import { Clock } from "./Clock";
import { InstructionRegister } from "./InstructionRegister";

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
  stage_rst = 0;

  setControl(bits: number | number[], value = 1) {
    this.ctrl_word = setBits(this.ctrl_word, bits, value);
  }

  getControl(bits: number | number[]) {
    return getBits(this.ctrl_word, bits);
  }

  always(clk: Clock, rst: number, ir: InstructionRegister, alu: Alu) {
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
    this.stage_rst = 0;

    // fetch TState 0
    if (this.stage == 0) {
      // load PC into MAR
      this.setControl([REG_RD_SEL4, REG_RD_SEL0], REG_PC); // read from registers[PC]
      this.setControl(REG_OE); // output selected register to bus
      this.setControl(MEM_MAR_WE); // read value on bus into MAR
    } else if (this.stage == 1) {
      // output ram[mar=PC] to bus and read bus into ir
      this.setControl(MEM_OE);
      this.setControl(IR_WE);
    } else if (this.stage == 2) {
      this.setControl([REG_WR_SEL4, REG_WR_SEL0], REG_PC);
      this.setControl([REG_EXT1, REG_EXT0], REG_INC);
    } else {
      switch (ir.out) {
        case 0x0e:
        case 0x1e:
        case 0x2e:
        case 0x3e:
        case 0x06:
        case 0x16:
        case 0x26:
          // MVI Rd, d8
          if (this.stage == 3) {
            this.setControl([REG_RD_SEL4, REG_RD_SEL0], REG_PC);
            this.setControl(REG_OE);
            this.setControl(MEM_MAR_WE);
          } else if (this.stage == 4) {
            if (getBits(ir.out, [5, 3]) == 0b111) {
              this.setControl(ALU_A_WE);
            } else {
              this.setControl([REG_WR_SEL4, REG_WR_SEL0], getBits(ir.out, [5, 3]));
              this.setControl(REG_WE);
            }
            this.setControl(MEM_OE);
          } else if (this.stage == 5) {
            this.setControl([REG_WR_SEL4, REG_WR_SEL0], REG_PC);
            this.setControl([REG_EXT1, REG_EXT0], REG_INC);
            this.stage_rst = 1;
          }
      }
    }
  }

  get display() {
    return isOn(this.ctrl_word, DISPLAY);
  }
  get hlt() {
    return isOn(this.ctrl_word, HLT);
  }
  get alu_cs() {
    return isOn(this.ctrl_word, ALU_CS);
  }
  get alu_flags_we() {
    return isOn(this.ctrl_word, ALU_FLAGS_WE);
  }
  get alu_a_we() {
    return isOn(this.ctrl_word, ALU_A_WE);
  }
  get alu_a_store() {
    return isOn(this.ctrl_word, ALU_A_STORE);
  }
  get alu_a_restore() {
    return isOn(this.ctrl_word, ALU_A_RESTORE);
  }
  get alu_tmp_we() {
    return isOn(this.ctrl_word, ALU_TMP_WE);
  }
  get alu_op() {
    return this.getControl([ALU_OP4, ALU_OP0]);
  }
  get alu_oe() {
    return isOn(this.ctrl_word, ALU_OE);
  }
  get alu_flags_oe() {
    return isOn(this.ctrl_word, ALU_FLAGS_OE);
  }
  get reg_rd_sel() {
    return this.getControl([REG_RD_SEL4, REG_RD_SEL0]);
  }
  get reg_wr_sel() {
    return this.getControl([REG_WR_SEL4, REG_WR_SEL0]);
  }
  get reg_ext() {
    return this.getControl([REG_EXT1, REG_EXT0]);
  }
  get reg_oe() {
    return isOn(this.ctrl_word, REG_OE);
  }
  get reg_we() {
    return isOn(this.ctrl_word, REG_WE);
  }
  get mem_we() {
    return isOn(this.ctrl_word, MEM_WE);
  }
  get mem_mar_we() {
    return isOn(this.ctrl_word, MEM_MAR_WE);
  }
  get mem_oe() {
    return isOn(this.ctrl_word, MEM_OE);
  }
  get ir_we() {
    return isOn(this.ctrl_word, IR_WE);
  }
}
