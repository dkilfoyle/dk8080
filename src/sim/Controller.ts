import { Alu } from "./Alu";
import { getBits, isOn, setBits } from "./Bits";
import { Clock } from "./Clock";
import { InstructionRegister } from "./InstructionRegister";
import { REGEXT, REGSEL } from "./Registers";

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

  always(clk: Clock, rst: number, ir: InstructionRegister, alu: Alu) {
    // always @(negedge clk, posedge rst)
    if (clk.isTock) {
      if (rst) {
        this.stage = 0;
        this.stage_max = 2;
      } else {
        if (this.stage_rst) {
          this.stage = 0;
          this.stage_max = 2;
        } else {
          this.stage++;
        }
      }
    }

    // always @(*)
    this.ctrl_word = 0;
    this.stage_rst = 0;
    const ir8 = ir.out.toString(8).padStart(3, "0");

    // fetch TState 0
    if (this.stage == 0) {
      this.setControls("mar=reg", REGSEL.PC);
    } else if (this.stage == 1) {
      // output ram[mar=PC] to bus and read bus into ir
      this.setControl(CTRL.MEM_OE);
      this.setControl(CTRL.IR_WE);
    } else if (this.stage == 2) {
      this.setControls("pc++");
    } else {
      // stage 3+
      switch (true) {
        case ir8.match(/1[0-7]+6/) != null:
          this.MOV_Rd_M(ir.out);
          break;
        case ir8.match(/16[0-7]+/) != null:
          this.MOV_M_Rs(ir.out);
          break;
        case ir8.match(/1[0-7]+[0-7]+/) != null:
          this.MOV_Rd_Rs(ir.out);
          break;
        case ir8 == "066":
          this.MVI_M_d8();
          break;
        case ir8.match(/0[0-7]+6/) != null:
          this.MVI_Rd_d8(ir.out);
          break;
        case ir8 == "001":
        case ir8 == "021":
        case ir8 == "041":
        case ir8 == "061":
          this.LXI_Rd_d16(ir.out);
          break;
        // default:
        //   throw Error();
      }
    }
  }

  MOV_Rd_M(irout: number) {
    this.stage_max = 4;
    const Rd = getBits(irout, [5, 3]);
    switch (this.stage) {
      case 3:
        this.setControls("mar=reg", REGSEL.HL);
        break;
      case 4:
        this.setControl(CTRL.MEM_OE);
        this.setControls("reg3=bus", Rd);
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  MOV_M_Rs(irout: number) {
    this.stage_max = 4;
    const Rs = getBits(irout, [2, 0]);
    switch (this.stage) {
      case 3:
        this.setControls("mar=reg", REGSEL.HL);
        break;
      case 4:
        this.setControls("bus=reg3", Rs);
        this.setControl(CTRL.MEM_WE);
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  MOV_Rd_Rs(irout: number) {
    this.stage_max = 3;
    const Rd = getBits(irout, [5, 3]);
    const Rs = getBits(irout, [2, 0]);
    // Rs = 2:0
    switch (this.stage) {
      case 3:
        this.setControls("bus=reg3", Rd);
        this.setControls("reg3=bus", Rs);
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  MVI_Rd_d8(irout: number) {
    this.stage_max = 5;
    const Rd = getBits(irout, [5, 3]);
    switch (this.stage) {
      case 3:
        this.setControls("mar=reg", REGSEL.PC);
        break;
      case 4:
        this.setControl(CTRL.MEM_OE);
        this.setControls("reg3=bus", Rd);
        break;
      case 5:
        this.setControls("pc++");
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  MVI_M_d8() {
    // MVI M, d8
    this.stage_max = 7;
    switch (this.stage) {
      case 3:
        this.setControls("mar=reg", REGSEL.PC);
        break;
      case 4:
        this.setControls("reg=ram[mar]", REGSEL.W);
        break;
      case 5:
        this.setControls("mar=reg", REGSEL.HL);
        break;
      case 6:
        this.setControls("ram[mar]=reg", REGSEL.W);
        break;
      case 7:
        this.setControls("pc++");
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  LXI_Rd_d16(irout: number) {
    this.stage_max = 9;
    const Rd = getBits(irout, [5, 4]);
    switch (this.stage) {
      case 3:
        this.setControls("mar=reg", REGSEL.PC);
        break;
      case 4:
        this.setControl(CTRL.MEM_OE);
        this.setControls("reg=bus", REGSEL.Z);
        break;
      case 5:
        this.setControls("pc++");
        break;
      case 6:
        this.setControls("mar=reg", REGSEL.PC);
        break;
      case 7:
        this.setControl(CTRL.MEM_OE);
        this.setControls("reg=bus", REGSEL.W);
        break;
      case 8:
        this.setControls("bus=reg", REGSEL.WZ);
        this.setControls("reg=bus", [REGSEL.BC, REGSEL.DE, REGSEL.HL, REGSEL.SP][Rd]);
        break;
      case 9:
        this.setControls("pc++");
        this.stage_rst = 1;
        break;
      default:
        throw Error();
    }
  }

  setControls(macroName: string, reg?: number) {
    switch (macroName) {
      case "pc++":
        this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], REGSEL.PC);
        this.setControl([CTRL.REG_EXT1, CTRL.REG_EXT0], REGEXT.INC);
        break;
      case "mar=reg":
        this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], reg);
        this.setControl(CTRL.REG_OE);
        this.setControl(CTRL.MEM_MAR_WE);
        break;
      case "reg=ram[mar]":
        this.setControl(CTRL.MEM_OE);
        this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], reg);
        this.setControl(CTRL.REG_WE);
        break;
      case "ram[mar]=reg":
        this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], reg);
        this.setControl(CTRL.REG_OE);
        this.setControl(CTRL.MEM_WE);
        break;
      case "reg3=bus":
        if (reg == 0b111) {
          this.setControl(CTRL.ALU_A_WE);
        } else {
          this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], reg);
          this.setControl(CTRL.REG_WE);
        }
        break;
      case "bus=reg3":
        if (reg == 0b111) {
          this.setControl(CTRL.ALU_OE);
        } else {
          this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], reg);
          this.setControl(CTRL.REG_OE);
        }
        break;
      case "reg=bus":
        this.setControl([CTRL.REG_WR_SEL4, CTRL.REG_WR_SEL0], reg);
        this.setControl(CTRL.REG_WE);
        break;
      case "bus=reg":
        this.setControl([CTRL.REG_RD_SEL4, CTRL.REG_RD_SEL0], reg);
        this.setControl(CTRL.REG_OE);
        break;
    }
  }

  get display() {
    return isOn(this.ctrl_word, CTRL.DISPLAY);
  }
  get hlt() {}
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
