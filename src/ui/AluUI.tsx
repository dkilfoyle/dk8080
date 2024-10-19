import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";
import { getBits, isOn } from "../sim/Bits";
import { ComputerState } from "../sim/Computer";
import { clsx } from "clsx";

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

export const AluUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-purple-100 p-2 gap-2">
      <Button label="ALU" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-2">
        <div className="flex flex-column">
          <span>ACC</span>
          <span>TMP</span>
          <span>Carry</span>
          <span>Flags</span>
          <span>ACT</span>
        </div>
        <div className="flex flex-column text-center w-3rem">
          <span>{fprint(compState.alu_acc, format)}</span>
          <span>{fprint(compState.alu_tmp, format)}</span>
          <span>{fprint(compState.alu_carry, format)}</span>
          <span>{fprint(compState.alu_flg, format)}</span>
          <span>{fprint(compState.alu_act, format)}</span>
        </div>
        <div className="flex flex-column text-right w-3rem">
          <span>OP</span>
        </div>
        <div className="flex flex-column text-center w-4rem">
          <span>{opnames[getBits(compState.ctrl_word, [24, 21])]}</span>
          <span className={clsx(isOn(compState.ctrl_word, 29))}>FLG_WE</span>
          <span className={clsx(isOn(compState.ctrl_word, 28))}>A_WE</span>
          <span className={clsx(isOn(compState.ctrl_word, 25))}>TMP_WE</span>
          <span className={clsx(isOn(compState.ctrl_word, 19))}>OE</span>
          <span className={clsx(isOn(compState.ctrl_word, 18))}>FLG_OE</span>
        </div>
      </div>
    </div>
  );
};
