import { Button } from "primereact/button";
import { useState } from "react";
import { fprint } from "./utils";

interface IrUIProps {
  ir: number;
}

export const IrUI = ({ ir }: IrUIProps) => {
  const [format, setFormat] = useState<16 | 10>(16);
  return (
    <div className="flex flex-column bg-green-100 p-2">
      <Button label="IR" onClick={() => setFormat(format == 16 ? 10 : 16)} size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>IR</span>
        </div>
        <div className="flex flex-column text-right" style={{ width: "30px" }}>
          <span>{fprint(ir, format)}</span>
        </div>
      </div>
    </div>
  );
};
