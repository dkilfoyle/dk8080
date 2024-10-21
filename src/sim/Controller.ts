import { Alu } from "./Alu";
import { getBits, isOn, setBits } from "./Bits";
import { Clock } from "./Clock";
import { InstructionRegister } from "./InstructionRegister";

export enum CTRL {
  DISPLAY = 32,
  HLT = 31,
  ALU_CS = 30,
  ALU_FLAGS_WE = 29,
  ALU_A_WE = 28,
  ALU_A_STORE = 27,
  ALU_A_RESTORE = 26,
  ALU_TMP_WE = 25,
  ALU_OP4 = 24,
  ALU_OP0 = 20,
  ALU_OE = 19,
  ALU_FLAGS_OE = 18,
  REG_RD_SEL4 = 17,
  REG_RD_SEL0 = 13,
  REG_WR_SEL4 = 12,
  REG_WR_SEL0 = 8,
  REG_EXT1 = 7,
  REG_EXT0 = 6,
  REG_OE = 5,
  REG_WE = 4,
  MEM_WE = 3,
  MEM_MAR_WE = 2,
  MEM_OE = 1,
  IR_WE = 0,
}

const REG_INC = 0b01;
// const REG_DEC = 0b10;
// const REG_INC2 = 0b11;
// const REG_BC = 0b10000;
// const REG_BC_B = 0b00000;
// const REG_BC_C = 0b00001;
// const REG_DE = 0b10010;
// const REG_DE_D = 0b00010;
// const REG_DE_E = 0b00011;
// const REG_HL = 0b10100;
// const REG_HL_H = 0b00100;
// const REG_HL_L = 0b00101;
// const REG_WZ = 0b10110;
// const REG_WZ_W = 0b00110;
// const REG_WZ_Z = 0b00111;
const REG_PC = 0b11000;
// const REG_PC_P = 0b01000;
// const REG_PC_C = 0b01001;
// const REG_SP = 0b11010;
// const REG_SP_S = 0b01010;
// const REG_SP_P = 0b01011;

export class Controller {
  ctrl_word = 0;
  stage = 0;
  stage_rst = 0;
  stage_max = 2;

  setControl(bits: number | number[], value = 1) {
    this.ctrl_word = setBits(this.ctrl_word, bits, value);
  }

  getControl(bits: number | number[]) {
    return getBits(this.ctrl_word, bits);
  }

  dump() {
    const bits = this.ctrl_word
      .toString(2)
      .padStart(32, "0")
      .split("")
      .map((x) => parseInt(x));
    console.table([
      bits.slice(0, 14),
      [
        "HLT",
        "ALU_CS",
        "ALU_FLAGS_WE",
        "ALU_A_WE",
        "ALU_A_STORE",
        "ALU_A_RESTORE",
        "ALU_TMP_WE",
        "ALU_OP4",
        "ALU_OP3",
        "ALU_OP2",
        "ALU_OP1",
        "ALU_OP0",
        "ALU_OE",
        "ALU_FLAGS_OE",
      ],
    ]);

    console.table([
      bits.slice(14),
      [
        "REG_RD_SEL4",
        "REG_RD_SEL3",
        "REG_RD_SEL2",
        "REG_RD_SEL1",
        "REG_RD_SEL0",
        "REG_WR_SEL4",
        "REG_WR_SEL3",
        "REG_WR_SEL2",
        "REG_WR_SEL1",
        "REG_WR_SEL0",
        "REG_EXT1",
        "REG_EXT0",
        "REG_OE",
        "REG_WE",
        "MEM_WE",
        "MEM_MAR_WE",
        "MEM_OE",
        "IR_WE",
      ],
    ]);
  }

  always(clk: Clock, rst: number, ir: InstructionRegister, alu: Alu) {
    // always @(negedge clk, posedge rst)
    if (clk.isTock) {
      if (rst) {
        this.stage = 0;
        this.stage_max = 2;
      } else {
        if (this.stage_rst) {
          this.stage = 0;
          console.log(`controller.tock stage rst to 0`);
        } else {
          this.stage++;
          console.log(`controller.tock stage++ => ${this.stage}`);
        }
      }
    }

    // always @(*)
    this.ctrl_word = 0;
    this.stage_rst = 0;

    // fetch TState 0
    if (this.stage == 0) {
      // load PC into MAR
      this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], REG_PC); // read from registers[PC]
      this.setControl(CTRL.REG_OE); // output selected register to bus
      this.setControl(CTRL.MEM_MAR_WE); // read value on bus into MAR
      console.log("controller.* stage 0 ");
      this.dump();
    } else if (this.stage == 1) {
      // output ram[mar=PC] to bus and read bus into ir
      this.setControl(CTRL.MEM_OE);
      this.setControl(CTRL.IR_WE);
      console.log("controller.* stage 1 ");
      this.dump();
    } else if (this.stage == 2) {
      this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], REG_PC);
      this.setControl([CTRL.REG_EXT1, CTRL.REG_EXT0], REG_INC);
      console.log("controller.* stage 2");
      this.dump();
    } else {
      console.log(`controller.* stage 3+ opcode = ${ir.out} ${alu.out}`);
      switch (ir.out) {
        case 0o1:
        case 0x0e:
        case 0x1e:
        case 0x2e:
        case 0x3e:
        case 0x06:
        case 0x16:
        case 0x26:
          // MVI Rd, d8
          this.stage_max = 5;
          if (this.stage == 3) {
            this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], REG_PC);
            this.setControl(CTRL.REG_OE);
            this.setControl(CTRL.MEM_MAR_WE);
          } else if (this.stage == 4) {
            if (getBits(ir.out, [5, 3]) == 0b111) {
              this.setControl(CTRL.ALU_A_WE);
            } else {
              this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], getBits(ir.out, [5, 3]));
              this.setControl(CTRL.REG_WE);
            }
            this.setControl(CTRL.MEM_OE);
          } else if (this.stage == 5) {
            this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], REG_PC);
            this.setControl([CTRL.REG_EXT1, CTRL.REG_EXT0], REG_INC);
            this.stage_rst = 1;
          }
      }
    }
  }

  get display() {
    return isOn(this.ctrl_word, CTRL.DISPLAY);
  }
  get hlt() {
    return isOn(this.ctrl_word, CTRL.HLT);
  }
  get alu_cs() {
    return isOn(this.ctrl_word, CTRL.ALU_CS);
  }
  get alu_flags_we() {
    return isOn(this.ctrl_word, CTRL.ALU_FLAGS_WE);
  }
  get alu_a_we() {
    return isOn(this.ctrl_word, CTRL.ALU_A_WE);
  }
  get alu_a_store() {
    return isOn(this.ctrl_word, CTRL.ALU_A_STORE);
  }
  get alu_a_restore() {
    return isOn(this.ctrl_word, CTRL.ALU_A_RESTORE);
  }
  get alu_tmp_we() {
    return isOn(this.ctrl_word, CTRL.ALU_TMP_WE);
  }
  get alu_op() {
    return this.getControl([CTRL.ALU_OP4, CTRL.ALU_OP0]);
  }
  get alu_oe() {
    return isOn(this.ctrl_word, CTRL.ALU_OE);
  }
  get alu_flags_oe() {
    return isOn(this.ctrl_word, CTRL.ALU_FLAGS_OE);
  }
  get reg_rd_sel() {
    return this.getControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0]);
  }
  get reg_wr_sel() {
    return this.getControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0]);
  }
  get reg_ext() {
    return this.getControl([CTRL.REG_EXT1, CTRL.REG_EXT0]);
  }
  get reg_oe() {
    return isOn(this.ctrl_word, CTRL.REG_OE);
  }
  get reg_we() {
    return isOn(this.ctrl_word, CTRL.REG_WE);
  }
  get mem_we() {
    return isOn(this.ctrl_word, CTRL.MEM_WE);
  }
  get mem_mar_we() {
    return isOn(this.ctrl_word, CTRL.MEM_MAR_WE);
  }
  get mem_oe() {
    return isOn(this.ctrl_word, CTRL.MEM_OE);
  }
  get ir_we() {
    return isOn(this.ctrl_word, CTRL.IR_WE);
  }
}
