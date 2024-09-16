import { FunctionalComponent } from "preact";
import styles from "../styles.module.css";
import { Display } from "../display.tsx";
import { StateContext } from "../../state/state-context";
import { useCallback, useContext } from "preact/hooks";
import { ApiContext } from "../../api";
import { Door } from "../door.tsx";

export const OnTheFloor: FunctionalComponent = () => {
  const state = useContext(StateContext);
  const api = useContext(ApiContext);

  const floor = state.user.currentFloor.value;

  const onUpClick = useCallback(() => {
    if (floor == null) {
      return;
    }

    state.user.requestedFloor.value = floor;

    api.call(floor, "up");
  }, [floor]);

  const onDownClick = useCallback(() => {
    if (floor == null) {
      return;
    }

    state.user.requestedFloor.value = floor;

    api.call(floor, "down");
  }, [floor]);

  return (
    <div className={`${styles.ElevatorRoot} ${styles.ElevatorOutside}`}>
      <h1>You are on the floor №{floor}</h1>
      <div>
        <button onClick={onUpClick}>up</button>
        <button onClick={onDownClick}>dow</button>
      </div>
      <Display />
      <Door />
    </div>
  );
};
