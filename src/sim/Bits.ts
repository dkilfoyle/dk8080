export const getBit = (x: number, bit: number) => (x & (1 << bit)) >> bit;
export const isOn = (x: number, bit: number) => ((x & (1 << bit)) == 0 ? 0 : 1);
export const setBit = (x: number, bit: number) => x | (1 << bit);
export const clearBit = (x: number, bit: number) => x & ~(1 << bit);
export const setBitTo = (x: number, bit: number, value: number) => {
  return value ? setBit(x, bit) : clearBit(x, bit);
};

export const combineBits = (bits: number[]) => {
  const x = 0;
  for (let i = 0; i < bits.length; i++) if (bits[i]) setBit(x, i);
  return x;
};
export const getBits = (x: number, bits: number | number[]) => {
  const [hi, lo] = Array.isArray(bits) ? bits : [bits, bits];
  return (x >> lo) & ((1 << (hi - lo)) - 1);
};
export const setBits = (x: number, bits: number | number[], value = 1) => {
  const [hi, lo] = Array.isArray(bits) ? bits : [bits, bits];
  for (let i = lo; i <= hi; i++) {
    if (isOn(value, i - lo)) x |= 1 << i;
    else x &= ~(1 << i);
  }
  return x;
};

export const hi = (x: number) => (x >> 8) & 0xff;
export const lo = (x: number) => x & 0xff;
