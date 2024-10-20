import { isOn } from "../sim/Bits";
import { ComputerState } from "../sim/Computer";
import { CTRL } from "../sim/Controller";

export const fprint = (x: number, f: 10 | 16) => {
  return f == 16 ? x.toString(f).padStart(2, "0") : x.toString(f).padStart(3, "0");
};

export const getValueBG = (s: ComputerState, oe: number, we: number, col: string) => {
  if (isOn(s.ctrl_word, oe)) return "bg-gray-300";
  if (isOn(s.ctrl_word, we) && s.clkState == "tick") return col;
  return "";
};

export const getBusColor = (s: ComputerState) => {
  if (isOn(s.ctrl_word, CTRL.ALU_OE)) return "purple";
  if (isOn(s.ctrl_word, CTRL.MEM_OE)) return "red";
  if (isOn(s.ctrl_word, CTRL.REG_OE)) return "blue";
  if (isOn(s.ctrl_word, CTRL.ALU_FLAGS_OE)) return "purple";
  return "gray";
};
