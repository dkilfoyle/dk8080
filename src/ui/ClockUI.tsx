import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { ComputerState } from "../sim/Computer";

import { VscDebugStepOver, VscDebugStepInto, VscDebugRestart, VscDebugStepBack, VscDebugStart, VscDebugStepOut } from "react-icons/vsc";

const pt = { root: { style: { padding: "0.3em 0.6em" } } };

export const ClockUI = ({
  compState,
  onRewind,
  onStepBack,
  onStepInto,
  onStepOut,
  onStepOver,
  onPlay,
}: {
  compState: ComputerState;
  onRewind: () => void;
  onStepBack: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
  onStepOver: () => void;
  onPlay: () => void;
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
        <ButtonGroup style={{ backgroundColor: "#f9f9f9" }}>
          <Button pt={pt} icon={() => <VscDebugRestart />} onClick={onRewind} size="small"></Button>
          <Button pt={pt} icon={() => <VscDebugStepBack />} onClick={onStepBack} size="small"></Button>
          <Button pt={pt} icon={() => <VscDebugStepInto />} onClick={onStepInto} size="small"></Button>
          <Button pt={pt} icon={() => <VscDebugStepOut />} onClick={onStepOut} size="small"></Button>
          <Button pt={pt} icon={() => <VscDebugStepOver />} onClick={onStepOver} size="small"></Button>
          <Button pt={pt} icon={() => <VscDebugStart />} onClick={onPlay} size="small"></Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
