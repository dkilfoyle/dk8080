import { useState, useMemo } from "react";
import _ from "lodash";
import { fprint } from "./utils";

interface RamProps {
  mem: number[];
}

export const RamUI = ({ mem }: RamProps) => {
  const [offset, setOffset] = useState(0);
  const [format, setFormat] = useState<16 | 10>(16);

  const memslice = useMemo(() => {
    return mem.slice(offset, offset + 16 * 16 + 1).map((x) => fprint(x, format));
  }, [format, mem, offset]);

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
              <span>{memslice[i * 16 + j]}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
