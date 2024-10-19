import { Button } from "primereact/button";
import { useMemo, useState } from "react";
import { fprint } from "./utils";
import { ComputerState } from "../sim/Computer";
import { isOn } from "../sim/Bits";
import clsx from "clsx";

export const BusUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);
  const bg = useMemo(() => {
    if (isOn(compState.ctrl_word, 19) || isOn(compState.ctrl_word, 18)) return "bg-purple-100";
    if (isOn(compState.ctrl_word, 5)) return "bg-blue-100";
    if (isOn(compState.ctrl_word, 1)) return "bg-red-100";
    return "bg-gray-100";
  }, [compState.ctrl_word]);
  const bg2 = useMemo(() => {
    if (isOn(compState.ctrl_word, 19) || isOn(compState.ctrl_word, 18)) return "bg-purple-300";
    if (isOn(compState.ctrl_word, 5)) return "bg-blue-300";
    if (isOn(compState.ctrl_word, 1)) return "bg-red-300";
    return "bg-gray-300";
  }, [compState.ctrl_word]);
  return (
    <div className={"flex flex-column p-2 gap-2 " + bg}>
      <Button label="Bus" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>BUS</span>
        </div>
        <div className="flex flex-column text-center w-2rem">
          <span
            className={clsx({
              [bg2]:
                isOn(compState.ctrl_word, 19) || isOn(compState.ctrl_word, 5) || isOn(compState.ctrl_word, 1) || isOn(compState.ctrl_word, 18),
            })}>
            {fprint(compState.bus, format)}
          </span>
        </div>
        <div className="flex flex-column text-center w-5rem">
          <span className={clsx({ [bg2]: isOn(compState.ctrl_word, 19) })}>ALU_OE</span>
          <span className={clsx({ [bg2]: isOn(compState.ctrl_word, 5) })}>REG_OE</span>
          <span className={clsx({ [bg2]: isOn(compState.ctrl_word, 1) })}>MEM_OE</span>
          <span className={clsx({ [bg2]: isOn(compState.ctrl_word, 18) })}>FLG_OE</span>
        </div>
      </div>
    </div>
  );
};
