import { useMemo, useState } from "react";
import { fprint, getBusColor } from "./utils";
import { Button } from "primereact/button";
import { getBits, isOn } from "../sim/Bits";
import { ComputerState } from "../sim/Computer";
import clsx from "clsx";
import { CTRL } from "../sim/Controller";

const regnames = [
  "B",
  "C",
  "D",
  "E",
  "H",
  "L",
  "W",
  "Z",
  "hi(PC)",
  "lo(PC)",
  "hi(SP)",
  "lo(SP)",
  "BC",
  "-",
  "DE",
  "-",
  "HL",
  "-",
  "WZ",
  "-",
  "PC",
  "-",
  "SP",
  "-",
];
const extnames = ["_", "INC", "DEC", "INC2"];

const getClass = (ctrl: { rd: string; wr: string; we: number; clk: string; oe: number }, s: ComputerState, x: string[]) => {
  if (ctrl.we == 1 && ctrl.clk == "tick" && x.includes(ctrl.wr)) return `bg-${getBusColor(s)}-300}`;
  if (ctrl.oe == 1 && x.includes(ctrl.rd)) return "bg-blue-300";
};

export const RegistersUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);

  const ctrl = useMemo(
    () => ({
      rd: regnames[getBits(compState.ctrl_word, [17, 13])],
      wr: regnames[getBits(compState.ctrl_word, [12, 8])],
      we: isOn(compState.ctrl_word, 4),
      oe: isOn(compState.ctrl_word, 5),
      clk: compState.clkState,
    }),
    [compState.clkState, compState.ctrl_word]
  );

  return (
    <div className="flex flex-column bg-blue-100 p-2 gap-2">
      <Button label="Registers" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-2">
        <div className="flex flex-column w-2rem text-left">
          <span>BC</span>
          <span>DE</span>
          <span>HL</span>
          <span>PC</span>
          <span>SP</span>
        </div>
        <div className="flex flex-column text-center w-2rem">
          <span className={getClass(ctrl, compState, ["B", "BC"])}>{fprint(compState.regs[0], format)}</span>
          <span className={getClass(ctrl, compState, ["D", "DE"])}>{fprint(compState.regs[2], format)}</span>
          <span className={getClass(ctrl, compState, ["H", "HL"])}>{fprint(compState.regs[4], format)}</span>
          <span className={getClass(ctrl, compState, ["hi(PC)", "PC"])}>{fprint(compState.regs[8], format)}</span>
          <span className={getClass(ctrl, compState, ["hi(SP)", "SP"])}>{fprint(compState.regs[10], format)}</span>
        </div>
        <div className="flex flex-column text-center w-2rem">
          <span className={getClass(ctrl, compState, ["C", "BC"])}>{fprint(compState.regs[1], format)}</span>
          <span className={getClass(ctrl, compState, ["E", "DE"])}>{fprint(compState.regs[3], format)}</span>
          <span className={getClass(ctrl, compState, ["L", "HL"])}>{fprint(compState.regs[5], format)}</span>
          <span className={getClass(ctrl, compState, ["lo(PC)", "PC"])}>{fprint(compState.regs[9], format)}</span>
          <span className={getClass(ctrl, compState, ["lo(SP)", "SP"])}>{fprint(compState.regs[11], format)}</span>
        </div>
        <div className="flex flex-column text-right w-5rem">
          <span>RD</span>
          <span>WR</span>
          <span>EXT</span>
        </div>
        <div className="flex flex-column text-right w-3rem">
          <span className="pr-2">{ctrl.rd}</span>
          <span className="pr-2">{ctrl.wr}</span>
          <span className={clsx({ "bg-blue-300": getBits(compState.ctrl_word, [CTRL.REG_EXT1, CTRL.REG_EXT0]) > 0 }, "pr-2")}>
            {extnames[getBits(compState.ctrl_word, [7, 6])]}
          </span>
          <span className={clsx({ "bg-blue-300": isOn(compState.ctrl_word, 5) }, "pr-2")}>OE</span>
          <span className={clsx({ "bg-blue-300": isOn(compState.ctrl_word, 4) }, "pr-2")}>WE</span>
        </div>
      </div>
    </div>
  );
};
