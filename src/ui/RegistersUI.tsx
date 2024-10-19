import { useMemo, useState } from "react";
import { fprint } from "./utils";
import { Button } from "primereact/button";
import { getBits, isOn } from "../sim/Bits";
import { ComputerState } from "../sim/Computer";
import clsx from "clsx";

const regnames = ["B", "C", "D", "E", "H", "L", "W", "Z", "hi(PC)", "lo(PC)", "hi(SP)", "lo(SP)", "BC", "DE", "HL", "WZ", "PC", "SP"];
const extnames = ["INC", "DEC", "INC2"];

const getClass = (rd: string, wr: string, x: string[]) => {
  return clsx({ "bg-blue-300": x.includes(rd), "bg-gray-400": x.includes(wr) });
};

export const RegistersUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);
  const rd = useMemo(() => regnames[getBits(compState.ctrl_word, [17, 13])], [compState.ctrl_word]);
  const wr = useMemo(() => regnames[getBits(compState.ctrl_word, [12, 8])], [compState.ctrl_word]);

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
          <span className={getClass(rd, wr, ["B", "BC"])}>{fprint(compState.regs[0], format)}</span>
          <span className={getClass(rd, wr, ["D", "DE"])}>{fprint(compState.regs[2], format)}</span>
          <span className={getClass(rd, wr, ["H", "HL"])}>{fprint(compState.regs[4], format)}</span>
          <span className={getClass(rd, wr, ["hi(PC)", "PC"])}>{fprint(compState.regs[6], format)}</span>
          <span className={getClass(rd, wr, ["hi(SP)", "SP"])}>{fprint(compState.regs[8], format)}</span>
        </div>
        <div className="flex flex-column text-center w-2rem">
          <span className={getClass(rd, wr, ["C", "BC"])}>{fprint(compState.regs[1], format)}</span>
          <span className={getClass(rd, wr, ["E", "DE"])}>{fprint(compState.regs[3], format)}</span>
          <span className={getClass(rd, wr, ["L", "HL"])}>{fprint(compState.regs[5], format)}</span>
          <span className={getClass(rd, wr, ["lo(PC)", "PC"])}>{fprint(compState.regs[7], format)}</span>
          <span className={getClass(rd, wr, ["lo(SP)", "SP"])}>{fprint(compState.regs[9], format)}</span>
        </div>
        <div className="flex flex-column text-right w-3rem">
          <span>RD</span>
          <span>WR</span>
          <span>EXT</span>
        </div>
        <div className="flex flex-column text-center w-3rem">
          <span className="bg-gray-200">{rd}</span>
          <span className="bg-gray-400">{wr}</span>
          <span>{extnames[getBits(compState.ctrl_word, [7, 6])]}</span>
          <span className={clsx({ "bg-blue-300": isOn(compState.ctrl_word, 5) })}>OE</span>
          <span className={clsx({ "bg-blue-300": isOn(compState.ctrl_word, 4) })}>WE</span>
        </div>
      </div>
    </div>
  );
};
