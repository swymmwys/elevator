import BaseElevatorState from "./BaseElevatorState";
import IdleEvent from "../events/IdleEvent";
import UpQueue from "../queue/UpQueue";
import DownQueue from "../queue/DownQueue";
import MoveUpEvent from "../events/MoveUpEvent";
import MoveDownEvent from "../events/MoveDownEvent";

export default class StopState extends BaseElevatorState {
  public continue(): void {
    const moveUp = this.ctrl.nextFloors instanceof UpQueue ? new MoveUpEvent() : null;
    const moveDown = this.ctrl.nextFloors instanceof DownQueue ? new MoveDownEvent() : null;

    this.eventEmitter.emit(moveUp ?? moveDown ?? new IdleEvent());
  }

  public selectFloor(floor: number): void {
    this.ctrl.queueFloor(floor);
  }

  public callUpFrom(floor: number): void {
    this.ctrl.upQueue.add(floor);
  }

  public callDownFrom(floor: number): void {
    this.ctrl.downQueue.add(floor);
  }

  public stop(): void {
    // nothing
  }

  public openDoor(): void {
    // nothing
  }

  public closeDoor(): void {
    // nothing
  }
}
