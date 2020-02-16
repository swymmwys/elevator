import BaseElevatorState from "./BaseElevatorState";
import StopEvent from "../events/StopEvent";
import Event from "../../fsm/Event";
import ArrivedEvent from "../events/ArrivedEvent";
import ElevatorQueue from "../queue/ElevatorQueue";
import IdleEvent from "../events/IdleEvent";
import UpQueue from "../queue/UpQueue";
import DownQueue from "../queue/DownQueue";
import MoveUpEvent from "../events/MoveUpEvent";
import MoveDownEvent from "../events/MoveDownEvent";

export default abstract class MovingState extends BaseElevatorState {
  protected cancelMovementTimeout?: NodeJS.Timeout;

  abstract callUpFrom(floor: number): void;
  abstract callDownFrom(floor: number): void;

  public stop(): void {
    this.eventEmitter.emit(new StopEvent());
  }

  public activate(event?: Event): void {
    super.activate(event);

    if (this.ctrl.nextFloors?.next == undefined) {
      const movingUp = this.ctrl.nextFloors instanceof UpQueue;
      const movingDown = this.ctrl.nextFloors instanceof DownQueue;
      const next = this.ctrl.nextFloors?.next;

      const moveUp =
        (movingUp && next) || (movingDown && !next) ? new MoveUpEvent() : null;

      const moveDown =
        (movingDown && next) || (movingUp && !next)
          ? new MoveDownEvent() 
          : null;

      this.eventEmitter.emit(moveUp ?? moveDown ?? new IdleEvent());
      return;
    }

    this.cancelMovementTimeout = setInterval(() => {
      const moveStep = this.ctrl.nextFloors!.next > this.ctrl.currentFloor ? 1 : -1;
      this.ctrl.currentFloor += moveStep;

      if (this.ctrl.currentFloor == this.ctrl.nextFloors?.next) {
        clearInterval(this.cancelMovementTimeout!);
        this.ctrl.nextFloors.poll();
        this.eventEmitter.emit(new ArrivedEvent());
      }
    }, 2000);
  }

  public deactivate(event?: Event): void {
    super.deactivate(event);

    if (this.cancelMovementTimeout != undefined) {
      clearInterval(this.cancelMovementTimeout);
      this.cancelMovementTimeout = undefined;
    }
  }

  public continue(): void {
    // nothing
  }

  public openDoor(): void {
    // nothing
  }

  public closeDoor(): void {
    // nothing
  }
}
