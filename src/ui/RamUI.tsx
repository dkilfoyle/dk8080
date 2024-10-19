import { useState, useMemo } from "react";
import _ from "lodash";
import { fprint } from "./utils";
import { ComputerState } from "../sim/Computer";

export const RamUI = ({ compState }: { compState: ComputerState }) => {
  const [offset, setOffset] = useState(0);
  const [format, setFormat] = useState<16 | 10>(16);

  const memslice = useMemo(() => {
    return compState.mem.slice(offset, offset + 16 * 16 + 1).map((x) => fprint(x, format));
  }, [compState.mem, format, offset]);

  return (
    <div className="flex flex-column bg-gray-100 p-2">
      <span className="text-lg font-bold pb-2">RAM</span>
      <div className="flex flex-row text-right gap-2">
        <div className="flex flex-column w-2rem">
          {/* row names */}
          <span>__</span>
          {_.range(0, 16).map((j) => (
            <span className="bg-gray-400 text-center">{j.toString(16).padStart(2, "0")}</span>
          ))}
        </div>
        {_.range(0, 16).map((j) => (
          <div className="flex flex-column">
            <span className="bg-gray-400 text-center">{j.toString(16)}</span>
            {_.range(0, 16).map((i) => (
              <span className={i * 16 + j == compState.mar ? "bg-red-100" : ""}>{memslice[i * 16 + j]}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
