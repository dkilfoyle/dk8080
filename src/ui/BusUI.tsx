import { Button } from "primereact/button";
import { useMemo, useState } from "react";
import { fprint, getBusColor } from "./utils";
import { ComputerState } from "../sim/Computer";
import { isOn } from "../sim/Bits";
import clsx from "clsx";
import { CTRL } from "../sim/Controller";

export const BusUI = ({ compState }: { compState: ComputerState }) => {
  const [format, setFormat] = useState<16 | 10>(16);

  const bg = useMemo(() => {
    return `bg-${getBusColor(compState)}`;
  }, [compState]);

  const ctrl = useMemo(
    () => ({
      alu_oe: isOn(compState.ctrl_word, CTRL.ALU_OE),
      reg_oe: isOn(compState.ctrl_word, CTRL.REG_OE),
      mem_oe: isOn(compState.ctrl_word, CTRL.MEM_OE),
      flages_oe: isOn(compState.ctrl_word, CTRL.ALU_FLAGS_OE),
    }),
    [compState.ctrl_word]
  );

  return (
    <div className={"flex flex-column p-2 gap-2 " + bg + "-100"}>
      <Button label="Bus" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>BUS</span>
        </div>
        <div className="flex flex-column text-center w-2rem">
          <span
            className={clsx({
              [bg + "-300"]: getBusColor(compState) != "gray",
            })}>
            {fprint(compState.bus, format)}
          </span>
        </div>
        <div className="flex flex-column text-right w-5rem">
          <span className={clsx({ [bg + "-200"]: ctrl.alu_oe }, "pr-2")}>ALU_OE</span>
          <span className={clsx({ [bg + "-200"]: ctrl.reg_oe }, "pr-2")}>REG_OE</span>
          <span className={clsx({ [bg + "-200"]: ctrl.mem_oe }, "pr-2")}>MEM_OE</span>
          <span className={clsx({ [bg + "-200"]: ctrl.flages_oe }, "pr-2")}>FLG_OE</span>
        </div>
      </div>
    </div>
  );
};
