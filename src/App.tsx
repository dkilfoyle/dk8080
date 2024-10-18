import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeflex/themes/primeone-light.css";
import { PrimeReactProvider } from "primereact/api";
import { Computer } from "./sim/Computer";
import { RegistersUI } from "./ui/RegistersUI";
import { AluUI } from "./ui/AluUI";
import { useMemo, useState } from "react";
import { BusUI, OtherUI } from "./ui/BusUI";
import { RamUI } from "./ui/RamUI";
import { MemUI } from "./ui/MemUI";
import { IrUI } from "./ui/IrUI";
import { CtrlUI } from "./ui/CtrlUI";

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

  const s = useMemo(() => {
    return comp.states[statei];
  }, [comp.states, statei]);

  return (
    <PrimeReactProvider>
      <div className="flex flex-column gap-3 align-items-center">
        <div className="flex gap-3">
          <div className="flex flex-column gap-3">
            <MemUI mar={s.mar} mem={s.mem}></MemUI>
            <IrUI ir={s.ir}></IrUI>
          </div>
          <div className="flex flex-column gap-3">
            <BusUI bus={s.bus} clkCount={s.clkCount} clkState={s.clkState}></BusUI>
          </div>
          <div className="flex flex-column gap-3">
            <RegistersUI regs={s.regs} ctrl_word={s.ctrl_word}></RegistersUI>
            <AluUI acc={s.alu_acc} tmp={s.alu_tmp} act={s.alu_act} carry={s.alu_carry} flg={s.alu_flg} ctrl_word={s.ctrl_word}></AluUI>
          </div>
        </div>
        <CtrlUI ctrl_word={s.ctrl_word}></CtrlUI>
        <RamUI mem={s.mem}></RamUI>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
