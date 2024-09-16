import { FunctionalComponent } from "preact";
import styles from "../styles.module.css";
import { Display } from "../display";
import { Door } from "../door";
import { useCallback, useContext, useRef } from "preact/hooks";
import { ApiContext } from "../../api";
import { StateContext } from "../../state/state-context";

export const InsideElevator: FunctionalComponent = () => {
  const api = useContext(ApiContext);
  const state = useContext(StateContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const onGoClick = useCallback(() => {
    const floor = parseInt(inputRef.current?.value ?? "");

    if (isNaN(floor)) {
      return;
    }

    state.user.requestedFloor.value = floor;

    api.selectFloor(floor);
  }, []);

  return (
    <div class={`${styles.ElevatorRoot} ${styles.ElevatorInside}`}>
      <h1>Inside elevator</h1>
      <div>
        <input
          ref={inputRef}
          type="number"
          placeholder="select floor"
          step={1}
        />
        <button onClick={onGoClick}>go</button>
      </div>
      <Display />
      <Door />
    </div>
  );
};
