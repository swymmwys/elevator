import { BaseElevator } from "elevator/BaseElevator";
import { Direction } from "elevator/IElevator";
import { MoveRequestEvent } from "elevator/events/MoveRequestEvent";
import { ArrivedEvent } from "elevator/events/ArrivedEvent";
import { Event } from "fsm/Event";

export class IdleState extends BaseElevator {
  override activate(event: Event) {
    super.activate(event);
  }

  override selectFloor(floor: number): void {
    if (floor === this.ctrl.currentFloor) {
      this.eventEmitter.emit(new ArrivedEvent(floor));
    } else {
      this.ctrl.queueFloor(floor);
      this.eventEmitter.emit(new MoveRequestEvent(floor));
    }
  }

  override call(floor: number, direction: Direction): void {
    if (floor === this.ctrl.currentFloor) {
      this.eventEmitter.emit(new ArrivedEvent(floor));
    } else {
      this.ctrl.queueFloorFrom(floor, direction);
      this.eventEmitter.emit(new MoveRequestEvent(floor));
    }
  }

  override openDoor(): void {
    this.logOperationUnavailable("open door");
  }

  override closeDoor(): void {
    this.logOperationUnavailable("close door");
  }

  override stop(): void {
    this.logOperationUnavailable("stop");
  }

  override continue(): void {
    this.logOperationUnavailable("continue");
  }
}
