import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeflex/themes/primeone-light.css";
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

function App() {
  const [statei, setStatei] = useState(0);

  const comp = useMemo(() => {
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
    const comp = new Computer(prog);
    comp.run();
    return comp;
  }, []);

  const curState = useMemo(() => {
    return comp.states[statei];
  }, [comp.states, statei]);

  const rewind = () => setStatei(0);
  const stepBack = () =>
    setStatei((cur) => {
      for (let i = cur - 1; i > 0; i--) {
        if (comp.states[i].stage == 0) return i;
      }
      return cur;
    });

  const stepInto = () => setStatei((cur) => cur - 1);
  const stepOut = () => setStatei((cur) => cur + 1);
  const stepOver = () =>
    setStatei((cur) => {
      for (let i = cur + 1; i < comp.states.length - 1; i++) {
        if (comp.states[i].stage == 3 && comp.states[i].clkState == "tock") return i;
      }
      return cur;
    });
  const play = () => setStatei(comp.states.length - 1);

  return (
    <PrimeReactProvider>
      <div className="flex flex-column gap-3 align-items-center">
        <div className="flex gap-3">
          <div className="flex flex-column gap-3">
            <MemUI compState={curState}></MemUI>
            <IrUI compState={curState}></IrUI>
            <ClockUI
              compState={curState}
              onRewind={rewind}
              onStepBack={stepBack}
              onStepInto={stepInto}
              onStepOut={stepOut}
              onStepOver={stepOver}
              onPlay={play}></ClockUI>
          </div>
          <div className="flex flex-column gap-3">
            <BusUI compState={curState}></BusUI>
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
