import _ from "lodash";
import { getBit } from "../sim/Bits";

interface CtrlUIProps {
  ctrl_word: number;
}

const names = [
  "HLT",
  "CS",
  "FLG_WE",
  "A_WE",
  "A_STR",
  "A_RSR",
  "TMP_WE",
  "OP4",
  "OP3",
  "OP2",
  "OP1",
  "OP0",
  "OE",
  "FLG_OE",
  "RD_SEL4",
  "RD_SEL3",
  "RD_SEL2",
  "RD_SEL1",
  "RD_SEL0",
  "WR_SEL4",
  "WR_SEL3",
  "WR_SEL2",
  "WR_SEL1",
  "WR_SEL0",
  "EXT1",
  "EXT0",
  "OE",
  "WE",
  "WE",
  "MAR_WE",
  "OE",
  "IR_WE",
].reverse();

export const CtrlUI = ({ ctrl_word }: CtrlUIProps) => {
  return (
    <div className="flex flex-column gap-2">
      <div className="flex gap-2">
        <span className="w-2rem">ALU</span>
        {_.range(31, 17, -1).map((i) => (
          <div className="flex flex-column w-3rem bg-purple-100">
            <span>{i}</span>
            <span className="text-xs">{names[i]}</span>
            <span className={getBit(ctrl_word, i) ? "bg-purple-400" : "bg-purple-100"}>{getBit(ctrl_word, i)}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="w-2rem">REG</span>
        {_.range(17, 3, -1).map((i) => (
          <div className="flex flex-column w-3rem bg-blue-100">
            <span>{i}</span>
            <span className="text-xs">{names[i]}</span>
            <span className={getBit(ctrl_word, i) ? "bg-blue-400" : "bg-blue-100"}>{getBit(ctrl_word, i)}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="w-2rem">MEM</span>
        {_.range(3, -1, -1).map((i) => (
          <div className="flex flex-column w-3rem bg-red-100">
            <span>{i}</span>
            <span className="text-xs">{names[i]}</span>
            <span className={getBit(ctrl_word, i) ? "bg-red-400" : "bg-red-100"}>{getBit(ctrl_word, i)}</span>
          </div>
        ))}
        <span>{ctrl_word}</span>
      </div>
    </div>
  );
};
