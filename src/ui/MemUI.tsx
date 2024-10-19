import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";
import { ComputerState } from "../sim/Computer";
import clsx from "clsx";
import { isOn } from "../sim/Bits";

export const MemUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-red-100 p-2 gap-2">
      <Button label="Mem" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-2">
        <div className="flex flex-column text-left w-5rem">
          <span>MAR</span>
          <span>RAM[MAR]</span>
        </div>
        <div className="flex flex-column text-center w-4rem">
          <span className={clsx({ "bg-red-300": isOn(compState.ctrl_word, 5) })}>{fprint(compState.mar, format)}</span>
          <span>{fprint(compState.mem[compState.mar], format)}</span>
        </div>
        <div className="flex flex-column text-center w-5rem">
          <span className={clsx({ "bg-red-300": isOn(compState.ctrl_word, 19) })}>MEM_WE</span>
          <span className={clsx({ "bg-red-300": isOn(compState.ctrl_word, 5) })}>MAR_WE</span>
        </div>
      </div>
    </div>
  );
};
