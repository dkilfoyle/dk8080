import { useState } from "react";
import { fprint } from "./utils";
import { Button } from "primereact/button";
import { getBit, getBits, isOn } from "../sim/Bits";

interface RegistersUIProps {
  regs: number[];
  ctrl_word: number;
}

const regnames = ["B", "C", "D", "E", "H", "L", "W", "Z", "PCP", "PCC", "SPS", "SPP", "BC", "DE", "HL", "WZ", "PC", "SP"];

export const RegistersUI = ({ regs, ctrl_word }: RegistersUIProps) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-blue-100 p-2">
      <Button label="Registers" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>BC</span>
          <span>DE</span>
          <span>HL</span>
          <span>PC</span>
          <span>SP</span>
          <span>RD</span>
          <span>WR</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{fprint(regs[0], format)}</span>
          <span>{fprint(regs[2], format)}</span>
          <span>{fprint(regs[4], format)}</span>
          <span>{fprint(regs[6], format)}</span>
          <span>{fprint(regs[8], format)}</span>
          <span>{regnames[getBits(ctrl_word, [17, 13])]}</span>
          <span>{regnames[getBits(ctrl_word, [12, 8])]}</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{fprint(regs[1], format)}</span>
          <span>{fprint(regs[3], format)}</span>
          <span>{fprint(regs[5], format)}</span>
          <span>{fprint(regs[7], format)}</span>
          <span>{fprint(regs[9], format)}</span>
          <span>{isOn(ctrl_word, 5) ? "OE" : "_"}</span>
          <span>{isOn(ctrl_word, 4) ? "WE" : "_"}</span>
        </div>
      </div>
    </div>
  );
};
