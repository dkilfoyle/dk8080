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
  const comp = new Computer();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  comp.always();

  const curState = useMemo(() => {
    return comp.states[statei];
  }, [comp.states, statei]);

  const rewind = () => setStatei(0);
  const stepBack = () => setStatei((cur) => cur - 1);
  const stepForward = () => setStatei((cur) => cur + 1);
  const fastForward = () => setStatei(comp.states.length - 1);

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
              onStepForward={stepForward}
              onFastForward={fastForward}></ClockUI>
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
