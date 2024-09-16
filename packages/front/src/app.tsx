import { Elevator } from "./elevator/elevator.tsx";
import { StateContext } from "./state/state-context";
import { createState } from "./state/state";
import { Api, ApiContext } from "./api";
import "./styles.css";

const state = createState();
const api = new Api(state.elevator);

export function App() {
  return (
    <ApiContext.Provider value={api}>
      <StateContext.Provider value={state}>
        <Elevator />
      </StateContext.Provider>
    </ApiContext.Provider>
  );
}
