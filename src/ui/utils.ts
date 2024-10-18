export const fprint = (x: number, f: 10 | 16) => {
  return f == 16 ? x.toString(f).padStart(2, "0") : x.toString(f).padStart(3, "0");
};
