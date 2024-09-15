import { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { StateContext } from "../state/state-context";

export const Display: FunctionComponent = () => {
  const state = useContext(StateContext);

  const { currentFloor, direction, upQueue, downQueue } = state.elevator.value;

  return (
    <div>
      <p>elevator floor: {currentFloor}</p>
      <p>direction: {direction}</p>
      <p>up queue: {upQueue.length ? upQueue.join(" | ") : "empty"}</p>
      <p>down queue: {downQueue.length ? downQueue.join(" | ") : "empty"}</p>
    </div>
  );
};
