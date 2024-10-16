import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Computer } from "./sim/Computer";

function App() {
  const comp = new Computer();
  comp.always();
  comp.always();
  comp.always();
  comp.always();
  return (
    <PrimeReactProvider>
      <h2>Hello</h2>
    </PrimeReactProvider>
  );
}

export default App;
