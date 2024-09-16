import { DoorStatus } from "elevator/ElevatorDoor";
import { Direction } from "elevator/IElevator";

export interface ElevatorStatus {
  readonly upQueue: number[];
  readonly downQueue: number[];
  readonly currentFloor: number;
  readonly direction: Direction;
  readonly doorStatus: DoorStatus;
}
