export type DoorStatus = "closed" | "open" | "closing" | "opening";
export type Direction = "up" | "down" | "none";

// todo: share types from backend or make common package with types
export interface ElevatorStatus {
  readonly upQueue: number[];
  readonly downQueue: number[];
  readonly currentFloor: number;
  readonly direction: Direction;
  readonly doorStatus: DoorStatus;
}
