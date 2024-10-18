import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";

interface BusUIProps {
  clkCount: number;
  clkState: string;
  bus: number;
}

export const BusUI = ({ bus, clkCount, clkState }: BusUIProps) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-blue-100 p-2">
      <Button label="Bus" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>CLK</span>
          <span>CLK</span>
          <span>BUS</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{clkCount}</span>
          <span>{clkState}</span>
          <span>{fprint(bus, format)}</span>
        </div>
      </div>
    </div>
  );
};
