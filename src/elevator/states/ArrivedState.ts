import BaseElevatorState from "./BaseElevatorState";
import Event from "../../fsm/Event";
import UpQueue from "../queue/UpQueue";
import MoveUpEvent from "../events/MoveUpEvent";
import DownQueue from "../queue/DownQueue";
import MoveDownEvent from "../events/MoveDownEvent";
import IdleEvent from "../events/IdleEvent";

export default class ArrivedState extends BaseElevatorState {
  public selectFloor(floor: number): void {
    if (this.ctrl.currentFloor == floor) {
      return;
    }

    if (!this.ctrl.nextFloors) {
      const up = floor > this.ctrl.currentFloor ? () => this.ctrl.useUpQueue() : null;
      const down = floor > this.ctrl.currentFloor ? () => this.ctrl.useDownQueue() : null;

      (up ?? down)!();
    }

    const onTheWay =
      (floor > this.ctrl.currentFloor &&
        this.ctrl.nextFloors instanceof UpQueue) ||
      (floor < this.ctrl.currentFloor &&
        this.ctrl.nextFloors instanceof DownQueue);

    if (onTheWay && this.ctrl.nextFloors) {
      this.ctrl.nextFloors.add(floor);
    } else {
      this.ctrl.queueFloor(floor);
    }
  }

  public callUpFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public callDownFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public openDoor(): void {
    this.door.open();
  }

  public closeDoor(): void {
    this.door.close(() => {
      const next = this.ctrl.nextFloors?.next;
      const idle =
        !next && !this.ctrl.downQueue.next && !this.ctrl.upQueue.next;

      if (idle) {
        this.eventEmitter.emit(new IdleEvent());
        return;
      }

      const movingUp = this.ctrl.nextFloors instanceof UpQueue;
      const movingDown = this.ctrl.nextFloors instanceof DownQueue;

      const moveUp =
        (movingUp && next) || (movingDown && !next) ? new MoveUpEvent() : null;

      const moveDown =
        (movingDown && next) || (movingUp && !next)
          ? new MoveDownEvent()
          : null;

      this.eventEmitter.emit(moveUp ?? moveDown ?? new IdleEvent());
    });
  }

  public activate(event?: Event): void {
    super.activate(event);
    this.door.open(() => this.closeDoor());
  }

  public stop(): void {
    // nothing
  }

  public continue(): void {
    // nothing
  }
}
