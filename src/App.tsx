import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import "../node_modules/primeflex/themes/primeone-light.css";
import { PrimeReactProvider } from "primereact/api";
import { Allotment } from "allotment";
import { ComputerUI } from "./sim/ui/ComputerUI";
import { useRef, useEffect } from "react";

import { setupConfigClassic } from "../packages/sap/src/setupClassic";
import { MonacoEditorLanguageClientWrapper } from "monaco-editor-wrapper";
import { configureMonacoWorkers } from "../packages/sap/src/setupCommon";

import "allotment/dist/style.css";

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

function App() {
  const monacoWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const executeClassic = async (htmlElement: HTMLElement) => {
      const userConfig = setupConfigClassic();
      const wrapper = new MonacoEditorLanguageClientWrapper();
      await wrapper.initAndStart(userConfig, htmlElement);
    };
    if (monacoWrapperRef.current) {
      configureMonacoWorkers();
      executeClassic(monacoWrapperRef.current);
    }
  }, []);

  return (
    <PrimeReactProvider>
      <Allotment>
        <div ref={monacoWrapperRef} id="monacoWrapper" className="bg-primary h-full w-full"></div>
        <ComputerUI></ComputerUI>
      </Allotment>
    </PrimeReactProvider>
  );
}

export default App;
