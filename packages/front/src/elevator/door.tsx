import { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { StateContext } from "../state/state-context";
import { Signal, useComputed } from "@preact/signals";
import { DoorStatus } from "elevator/elevator-status.ts";

export const Door: FunctionComponent = () => {
  const { user, elevator } = useContext(StateContext);

  let doorStatus: Signal<DoorStatus> = useComputed(() => {
    const keepClosed = user.currentFloor.value !== elevator.value.currentFloor;

    return keepClosed ? "closed" : elevator.value.doorStatus;
  });

  return (
    <div>
      <p>door: {doorStatus}</p>
    </div>
  );
};
