import { BaseElevator } from "elevator/BaseElevator";
import { StopEvent } from "../events/StopEvent";
import { Event } from "fsm/Event";
import { ArrivedEvent } from "../events/ArrivedEvent";
import { MoveRequestEvent } from "elevator/events/MoveRequestEvent";
import { Direction } from "elevator/IElevator";
import { ContinueEvent } from "elevator/events/ContinueEvent";

export class MovingState extends BaseElevator {
  private readonly movementTimeMs = 2000;
  private movementTimeout: NodeJS.Timeout | null = null;

  override stop(): void {
    this.eventEmitter.emit(new StopEvent());
  }

  override activate(event: MoveRequestEvent | ContinueEvent): void {
    super.activate(event);

    const nextFloor =
      event instanceof MoveRequestEvent ? event.floor : this.ctrl.nextFloor;

    if (nextFloor === null) {
      this.eventEmitter.emit(new StopEvent("queue is empty during move"));

      return;
    }

    this.startMoving();
  }

  override selectFloor(floor: number): void {
    // we can't stop if current floor matches requested, so it should be added to the opposite q relatively to elevator movement direction
    if (floor === this.ctrl.currentFloor) {
      switch (this.ctrl.direction) {
        case "up": {
          this.ctrl.downQ.add(floor);
          break;
        }
        case "down": {
          this.ctrl.upQ.add(floor);
          break;
        }
        default:
          break;
      }
    } else {
      this.ctrl.queueFloor(floor);
    }
  }

  override call(floor: number, direction: Direction): void {
    this.ctrl.queueFloorFrom(floor, direction);
  }

  private startMoving(): void {
    this.movementTimeout = setInterval(() => {
      const nextStop = this.ctrl.nextFloor;

      if (nextStop === null) {
        this.eventEmitter.emit(new StopEvent("queue is empty during move"));

        return;
      }

      if (this.ctrl.currentFloor == nextStop) {
        this.eventEmitter.emit(new ArrivedEvent(nextStop));
      } else {
        const moveStep = nextStop > this.ctrl.currentFloor ? 1 : -1;

        this.ctrl.currentFloor += moveStep;

        console.log(
          `MovingState: move step = ${moveStep}, current floor = ${this.ctrl.currentFloor}`,
        );
      }
    }, this.movementTimeMs);
  }

  private stopMoving(): void {
    if (this.movementTimeout != null) {
      clearInterval(this.movementTimeout);
    }
  }

  override deactivate(event: Event): void {
    this.stopMoving();
    super.deactivate(event);
  }

  override continue(): void {
    this.logOperationUnavailable("continue");
  }

  override openDoor(): void {
    this.logOperationUnavailable("open door");
  }

  override closeDoor(): void {
    this.logOperationUnavailable("close door");
  }
}
