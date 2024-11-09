import { useInterval } from "primereact/hooks";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import {
  VscDebugRestart,
  VscDebugStepBack,
  VscDebugStepInto,
  VscDebugStepOut,
  VscDebugStepOver,
  VscDebugStart,
  VscDebugPause,
  VscRunAll,
} from "react-icons/vsc";
import { useState, useMemo } from "react";
import { Computer } from "../emulator/Computer";
import { AluUI } from "./AluUI";
import { BusUI } from "./BusUI";
import { ClockUI } from "./ClockUI";
import { CtrlUI } from "./CtrlUI";
import { DisplayUI } from "./DisplayUI";
import { IrUI } from "./IrUI";
import { MemUI } from "./MemUI";
import { RamUI } from "./RamUI";
import { RegistersUI } from "./RegistersUI";

const prog = [
  // lxi sp, $f0
  0x31, 0xf0, 0x00,
  // mvi a, $1
  0x3e, 0x01,
  // mvi b, $0
  0x06, 0x00,

  // loop
  // out
  0xd3, 0xff,

  // mov c,a
  0x4f,

  // mov a,b
  0x78,

  // cpi $1
  0xfe, 0x01,

  // mov a,c
  0x79,

  // jz rotate_right
  0xca, 0x17, 0x00,

  // jnz rotate_left
  0xc2, 0x20, 0x00,

  // jmp loop
  0xc3, 0x07, 0x00,

  // rotate_right
  // rar
  0x1f,

  // cpi $1
  0xfe, 0x01,

  // cz set_left
  0xcc, 0x29, 0x00,

  // jmp loop
  0xc3, 0x07, 0x00,

  0x17,

  0xfe, 0x80,

  0xcc, 0x2c, 0x00,

  0xc3, 0x07, 0x00,

  0x06, 0x00,

  0xc9,

  0x06, 0x01,

  0xc9,

  0x76,
];

const pt = { root: { style: { padding: "0.3em 0.6em" } } };

export function ComputerUI() {
  const [statei, setStatei] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [runSpeed, setRunSpeed] = useState(200);
  const [runSteppingMode, setRunSteppingMode] = useState(0);

  const comp = useMemo(() => {
    const comp = new Computer(prog);
    comp.run();
    return comp;
  }, []);

  const curState = useMemo(() => {
    return comp.states[statei];
  }, [comp.states, statei]);

  const stepBack = (cur: number) => {
    for (let i = cur - 1; i > 0; i--) {
      if (comp.states[i].stage == 3 && comp.states[i].clkState == "tock") return i;
    }
    return cur;
  };
  const stepInto = (cur: number) => Math.max(cur - 1, 0);
  const stepOut = (cur: number) => Math.min(cur + 1, comp.states.length - 1);
  const stepOver = (cur: number) => {
    for (let i = cur + 1; i < comp.states.length - 1; i++) {
      if (comp.states[i].stage == 3 && comp.states[i].clkState == "tock") return i;
    }
    return cur;
  };
  const playOut = () => {
    setRunSteppingMode(0);
    setIsRun((cur) => !cur);
  };
  const playOver = () => {
    setRunSteppingMode(1);
    setIsRun((cur) => !cur);
  };

  useInterval(
    () => {
      setStatei((cur) => (runSteppingMode == 0 ? stepOut(cur) : stepOver(cur)));
    },
    runSpeed,
    isRun
  );

  return (
    <div className="flex flex-column gap-3 align-items-center">
      <div className="flex gap-3">
        <div className="flex flex-column gap-3">
          <MemUI compState={curState}></MemUI>
          <IrUI compState={curState}></IrUI>
          <ClockUI compState={curState}>
            <div className="flex flex-row gap-1">
              <ButtonGroup style={{ backgroundColor: "#f9f9f9" }}>
                <Button pt={pt} icon={() => <VscDebugRestart />} onClick={() => setStatei(0)} size="small"></Button>
                <Button pt={pt} icon={() => <VscDebugStepBack />} onClick={() => setStatei(stepBack)} size="small"></Button>
                <Button pt={pt} icon={() => <VscDebugStepInto />} onClick={() => setStatei(stepInto)} size="small"></Button>
                <Button pt={pt} icon={() => <VscDebugStepOut />} onClick={() => setStatei(stepOut)} size="small"></Button>
                <Button pt={pt} icon={() => <VscDebugStepOver />} onClick={() => setStatei(stepOver)} size="small"></Button>
                <Button pt={pt} icon={() => (isRun ? <VscDebugPause /> : <VscDebugStart />)} onClick={playOut} size="small"></Button>
                <Button pt={pt} icon={() => (isRun ? <VscDebugPause /> : <VscRunAll />)} onClick={playOver} size="small"></Button>
              </ButtonGroup>
            </div>
          </ClockUI>
        </div>
        <div className="flex flex-column gap-3">
          <BusUI compState={curState}></BusUI>
          <DisplayUI compState={curState}></DisplayUI>
        </div>
        <div className="flex flex-column gap-3">
          <AluUI compState={curState}></AluUI>
          <RegistersUI compState={curState}></RegistersUI>
        </div>
      </div>
      <CtrlUI compState={curState}></CtrlUI>
      <RamUI compState={curState}></RamUI>
    </div>
  );
}
