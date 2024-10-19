import { Button } from "primereact/button";
import { ComputerState } from "../sim/Computer";

export const ClockUI = ({
  compState,
  onRewind,
  onStepBack,
  onStepForward,
  onFastForward,
}: {
  compState: ComputerState;
  onRewind: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onFastForward: () => void;
}) => {
  return (
    <div className="flex flex-column p-2 gap-2 bg-yellow-100">
      <Button label="Clock" size="small"></Button>
      <div className="flex flex-row gap-5">
        <div className="flex flex-column">
          <span>CLK</span>
          <span>CLK</span>
        </div>
        <div className="flex flex-column text-right w-2rem">
          <span>{compState.clkCount}</span>
          <span>{compState.clkState}</span>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <Button label="<<" onClick={onRewind} size="small"></Button>
        <Button label="<" onClick={onStepBack} size="small"></Button>
        <Button label=">" onClick={onStepForward} size="small"></Button>
        <Button label=">>" onClick={onFastForward} size="small"></Button>
      </div>
    </div>
  );
};
