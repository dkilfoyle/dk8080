export const isOn = (x: number, bit: number) => (x & (1 << bit)) != 0;
export const setBit = (x: number, bit: number) => x | (1 << bit);
export const clearBit = (x: number, bit: number) => x & ~(1 << bit);
export const hi = (x: number) => (x >> 8) & 0xff;
export const lo = (x: number) => x & 0xff;
