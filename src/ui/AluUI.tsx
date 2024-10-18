import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";
import { getBits } from "../sim/Bits";

interface AluUIProps {
  acc: number;
  carry: number;
  act: number;
  tmp: number;
  flg: number;
  ctrl_word: number;
}

const opnames = [
  "ADD",
  "ADC",
  "SUB",
  "SBB",
  "ANA",
  "XRA",
  "ORA",
  "CMP",
  "RLC",
  "RRC",
  "RAL",
  "RAR",
  "DAA", // unsupported
  "CMA",
  "STC",
  "CMC",
  "INR",
  "DCR",
];

export const AluUI = ({ acc, carry, act, tmp, flg, ctrl_word }: AluUIProps) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-purple-100 p-2">
      <Button label="ALU" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>ACC</span>
          <span>TMP</span>
          <span>Carry</span>
          <span>Flags</span>
          <span>ACT</span>
          <span>OP</span>
          <span>OP</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{fprint(acc, format)}</span>
          <span>{fprint(tmp, format)}</span>
          <span>{fprint(carry, format)}</span>
          <span>{fprint(flg, format)}</span>
          <span>{fprint(act, format)}</span>
          <span>{getBits(ctrl_word, [17, 8])}</span>
          <span>{opnames[getBits(ctrl_word, [17, 8])]}</span>
        </div>
      </div>
    </div>
  );
};
