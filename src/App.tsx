import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeflex/themes/primeone-light.css";
import { useInterval } from "primereact/hooks";
import { PrimeReactProvider } from "primereact/api";
import { Computer } from "./sim/Computer";
import { RegistersUI } from "./ui/RegistersUI";
import { AluUI } from "./ui/AluUI";
import { useMemo, useState } from "react";
import { BusUI } from "./ui/BusUI";
import { RamUI } from "./ui/RamUI";
import { MemUI } from "./ui/MemUI";
import { IrUI } from "./ui/IrUI";
import { CtrlUI } from "./ui/CtrlUI";
import { ClockUI } from "./ui/ClockUI";
import { DisplayUI } from "./ui/DisplayUI";
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
  VscDebugAll,
  VscRunAll,
} from "react-icons/vsc";

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

function App() {
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
    <PrimeReactProvider>
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
    </PrimeReactProvider>
  );
}

export default App;
