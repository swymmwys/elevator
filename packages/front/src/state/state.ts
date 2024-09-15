import { effect, Signal, signal } from "@preact/signals";
import { User, UserLocation } from "user";
import { ElevatorStatus } from "../elevator/elevator-status";

export type State = Readonly<{
  user: User;
  elevator: Signal<ElevatorStatus>;
}>;

export function createState(): State {
  const user: User = {
    currentFloor: signal<number | null>(0),
    location: signal<UserLocation>("on-the-floor"),
    requestedFloor: signal<number | null>(null),
  };

  // todo: make status like user --- split into separate signals
  const elevator = signal<ElevatorStatus>({
    currentFloor: 0,
    direction: "none",
    doorStatus: "closed",
    downQueue: [],
    upQueue: [],
  });

  // todo: don't like that it's defined here, probably should go to some common place for effects
  effect(function goToElevatorIfElevatorArrived() {
    const elevatorArrived =
      user.currentFloor.value === elevator.value.currentFloor &&
      elevator.value.doorStatus === "open";

    const gotToElevator =
      elevatorArrived &&
      elevator.value.currentFloor === user.requestedFloor.value;

    if (gotToElevator) {
      user.location.value = "inside-elevator";
      user.currentFloor.value = null;
      user.requestedFloor.value = null;
    }
  });

  // user will go out on the latest requested floor
  effect(function goToTheFloorIfUserArrived() {
    const userArrived =
      user.requestedFloor.value === elevator.value.currentFloor &&
      elevator.value.doorStatus === "open";

    if (userArrived) {
      user.location.value = "on-the-floor";
      user.currentFloor.value = elevator.value.currentFloor;
      user.requestedFloor.value = null;
    }
  });

  return {
    user,
    elevator,
  };
}
