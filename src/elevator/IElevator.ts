import ElevatorStatus from "./ElevatorStatus";

export default interface IElevator {
    stop(): void;
    continue(): void;
    selectFloor(floor: number): void;
    callUpFrom(floor: number): void;
    callDownFrom(floor: number): void;
    openDoor(): void;
    closeDoor(): void;
    callHelp(): void;
    getStatus(): ElevatorStatus;
}
