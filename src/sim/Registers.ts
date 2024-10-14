import { hi, isOn, lo } from "./Bits";

enum REG8 {
  B = 0,
  C,
  D,
  E,
  H,
  L,
  W,
  Z,
  PCP,
  PCC,
  SPS,
  SPP,
}

enum REG16 {
  BC = 0,
  DE = 2,
  HL = 4,
  WZ = 6,
  PC = 8,
  SP = 10,
}

enum REGSEL {
  B = 0,
  C,
  D,
  E,
  H,
  L,
  W,
  Z,
  PCP,
  PCC,
  SPS,
  SPP,
  BC = 0b10000,
  DE = 0b10010,
  HL = 0b10100,
  WZ = 0b10110,
  PC = 0b11000,
  SP = 0b11010,
}

enum REGEXT {
  INC = 0b01,
  DEC = 0b10,
  INC2 = 0b11,
}

export class Registers {
  registers = new Uint8Array(12);
  get b() {
    return this.registers[REG8.B];
  }
  set b(x: number) {
    this.registers[REG8.B] = x & 0xff;
  }
  get c() {
    return this.registers[REG8.C];
  }
  set c(x: number) {
    this.registers[REG8.C] = x & 0xff;
  }
  get d() {
    return this.registers[REG8.D];
  }
  set d(x: number) {
    this.registers[REG8.D] = x & 0xff;
  }
  get e() {
    return this.registers[REG8.E];
  }
  set e(x: number) {
    this.registers[REG8.E] = x & 0xff;
  }
  get h() {
    return this.registers[REG8.H];
  }
  set h(x: number) {
    this.registers[REG8.H] = x & 0xff;
  }
  get l() {
    return this.registers[REG8.L];
  }
  set l(x: number) {
    this.registers[REG8.L] = x & 0xff;
  }
  get bc() {
    return ((this.b << 8) | this.c) & 0xffff;
  }
  set bc(x: number) {
    this.registers[REG16.BC] = hi(x);
    this.registers[REG16.BC + 1] = lo(x);
  }
  get de() {
    return ((this.d << 8) | this.e) & 0xffff;
  }
  set de(x: number) {
    this.registers[REG16.DE] = hi(x);
    this.registers[REG16.DE + 1] = lo(x);
  }
  get hl() {
    return ((this.h << 8) | this.l) & 0xffff;
  }
  set hl(x: number) {
    this.registers[REG16.HL] = hi(x);
    this.registers[REG16.HL + 1] = lo(x);
  }
  get wz() {
    return ((this.registers[REG8.W] << 8) | this.registers[REG8.Z]) & 0xffff;
  }
  set wz(x: number) {
    this.registers[REG16.WZ] = hi(x);
    this.registers[REG16.WZ + 1] = lo(x);
  }
  get pc() {
    return ((this.registers[8] << 8) | this.registers[9]) & 0xffff;
  }
  set pc(x: number) {
    this.registers[REG16.PC] = hi(x);
    this.registers[REG16.PC + 1] = lo(x);
  }
  get sp() {
    return ((this.registers[10] << 8) | this.registers[11]) & 0xffff;
  }
  set sp(x: number) {
    this.registers[REG16.SP] = hi(x);
    this.registers[REG16.SP + 1] = lo(x);
  }
  read(rd_sel: number) {
    if (rd_sel <= 0b1011) return this.registers[rd_sel] & 0xffff;
    else {
      switch (rd_sel) {
        case 0b10000:
          return this.bc;
        case 0b10010:
          return this.de;
        case 0b10100:
          return this.hl;
        case 0b10110:
          return this.wz;
        case 0b11000:
          return this.pc;
        case 0b11010:
          return this.sp;
        default:
          throw Error(`Invalid registers.read(0b${rd_sel.toString(2)})`);
      }
    }
  }
  ext(wr_sel: REGSEL, ext: REGEXT) {
    if (wr_sel < 0b10000) throw Error(`register.ext invalid wr_sel ${wr_sel}`);
    const extAdd = [0, 1, -1, 2][ext];
    const wr_dst = wr_sel & 0b1111;

    switch (wr_dst) {
      case REGSEL.BC:
        this.bc += extAdd;
        break;
      case REGSEL.DE:
        this.de += extAdd;
        break;
      case REGSEL.HL:
        this.hl += extAdd;
        break;
      case REGSEL.WZ:
        this.wz += extAdd;
        break;
      case REGSEL.PC:
        this.pc += extAdd;
        break;
      case REGSEL.SP:
        this.sp += extAdd;
        break;
    }
  }
  write(wr_sel: REGSEL, data_in: number) {
    const wr_ext = isOn(wr_sel, 4);
    const wr_dst = wr_sel & 0b1111;
    if (wr_ext) {
      switch (wr_dst) {
        case REGSEL.BC:
          this.bc = data_in;
          break;
        case REGSEL.DE:
          this.de = data_in;
          break;
        case REGSEL.HL:
          this.hl = data_in;
          break;
        case REGSEL.WZ:
          this.wz = data_in;
          break;
        case REGSEL.PC:
          this.pc = data_in;
          break;
        case REGSEL.SP:
          this.sp = data_in;
          break;
      }
    } else this.registers[wr_dst] = data_in & 0xff;
  }
  reset() {
    this.registers.fill(0);
  }
}
