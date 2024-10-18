import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";

interface MemUIProps {
  mar: number;
  mem: number[];
}

export const MemUI = ({ mar, mem }: MemUIProps) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-red-100 p-2">
      <Button label="Mem" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>MAR</span>
          <span>RAM[MAR]</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{fprint(mar, format)}</span>
          <span>{fprint(mem[mar], format)}</span>
        </div>
      </div>
    </div>
  );
};
