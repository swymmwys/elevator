import { BaseElevator } from "elevator/BaseElevator";
import { ArrivedEvent } from "elevator/events/ArrivedEvent";
import { Event } from "fsm/Event";
import { ContinueEvent } from "elevator/events/ContinueEvent";
import { IdleEvent } from "elevator/events/IdleEvent";
import { Direction } from "elevator/IElevator";

export class ArrivedState extends BaseElevator {
  override openDoor(): void {
    void this.ctrl.door.open();
  }

  override closeDoor(): void {
    this.ctrl.door.close().then(() => {
      const hasFloorsQueued =
        this.ctrl.upQ.next !== null || this.ctrl.downQ.next !== null;

      const nextEvent = hasFloorsQueued ? new ContinueEvent() : new IdleEvent();

      this.eventEmitter.emit(nextEvent);
    });
  }

  override async activate(event: ArrivedEvent): Promise<void> {
    super.activate(event);

    this.ctrl.removeNextFloor();

    await this.ctrl.door.open();

    // emulating delay for open door state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.closeDoor();
  }

  override deactivate(event: Event) {
    this.ctrl.door.close().then(() => {
      super.deactivate(event);
    });
  }

  override selectFloor(floor: number) {
    if (floor === this.ctrl.currentFloor) {
      return;
    }

    this.ctrl.queueFloor(floor);
    this.closeDoor();
  }

  call(floor: number, direction: Direction): void {
    this.ctrl.queueFloorFrom(floor, direction);
  }

  override stop(): void {
    this.logOperationUnavailable("stop");
  }

  override continue(): void {
    this.logOperationUnavailable("continue");
  }
}
