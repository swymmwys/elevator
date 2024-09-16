import { ElevatorStatus } from "elevator/ElevatorStatus";

export type Direction = "up" | "down" | "none";

export interface IElevator {
  stop(): void;

  continue(): void;

  selectFloor(floor: number): void;

  call(floor: number, direction: Direction): void;

  openDoor(): void;

  closeDoor(): void;

  callHelp(): void;

  getStatus(): ElevatorStatus;
}
