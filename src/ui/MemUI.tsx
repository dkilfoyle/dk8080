import { Button } from "primereact/button";
import { useState } from "react";
import { fprint, getBusColor } from "./utils";
import { ComputerState } from "../sim/Computer";
import clsx from "clsx";
import { isOn } from "../sim/Bits";
import { CTRL } from "../sim/Controller";

export const MemUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-red-100 p-2 gap-2">
      <Button label="Mem" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-2">
        <div className="flex flex-column text-left w-5rem">
          <span>RAM[MAR]</span>
          <span>MAR</span>
        </div>
        <div className="flex flex-column text-center w-4rem">
          <span
            className={clsx({
              [`bg-${getBusColor(compState)}-300`]: isOn(compState.ctrl_word, CTRL.MEM_WE) && compState.clkState == "tick",
              "bg-red-300": isOn(compState.ctrl_word, CTRL.MEM_OE),
            })}>
            {fprint(compState.mem[compState.mar], format)}
          </span>
          <span
            className={clsx({
              [`bg-${getBusColor(compState)}-300`]: isOn(compState.ctrl_word, CTRL.MEM_MAR_WE) && compState.clkState == "tick",
            })}>
            {fprint(compState.mar, format)}
          </span>
        </div>
        <div className="w-1rem"></div>
        <div className="flex flex-column text-right w-5rem">
          <span className={clsx({ "bg-red-200": isOn(compState.ctrl_word, CTRL.MEM_WE) }, "pr-2")}>MEM_WE</span>
          <span className={clsx({ "bg-red-200": isOn(compState.ctrl_word, CTRL.MEM_MAR_WE) }, "pr-2")}>MAR_WE</span>
          <span className={clsx({ "bg-red-200": isOn(compState.ctrl_word, CTRL.MEM_OE) }, "pr-2")}>OE</span>
        </div>
      </div>
    </div>
  );
};
