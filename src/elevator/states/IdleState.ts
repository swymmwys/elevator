import BaseElevatorState from "./BaseElevatorState";
import ArrivedEvent from "../events/ArrivedEvent";
import MoveUpEvent from "../events/MoveUpEvent";
import MoveDownEvent from "../events/MoveDownEvent";

export default class IdleState extends BaseElevatorState {
  public selectFloor(floor: number): void {
    if (floor == this.ctrl.currentFloor) {
      this.eventEmitter.emit(new ArrivedEvent());
    } else {
      this.ctrl.queueFloor(floor);
      const moveUp = floor > this.ctrl.currentFloor ? new MoveUpEvent() : null;
      const moveDown = floor < this.ctrl.currentFloor ? new MoveDownEvent() : null;
      this.eventEmitter.emit((moveUp || moveDown)!);
    }
  }

  public callUpFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public callDownFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public openDoor(): void {
    // nothing
  }

  public closeDoor(): void {
    // nothing
  }

  public stop(): void {
    // nothing
  }

  public continue(): void {
    // nothing
  }
}
