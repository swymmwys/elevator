import { BaseElevator } from "elevator/BaseElevator";
import { Direction } from "elevator/IElevator";
import { ContinueEvent } from "elevator/events/ContinueEvent";

export class StopState extends BaseElevator {
  override continue(): void {
    this.eventEmitter.emit(new ContinueEvent());
  }

  override selectFloor(_floor: number): void {
    this.logOperationUnavailable("select floor");
  }

  override call(_floor: number, _direction: Direction): void {
    this.logOperationUnavailable("call");
  }

  override stop(): void {
    this.logOperationUnavailable("stop");
  }

  override openDoor(): void {
    this.logOperationUnavailable("openDoor");
  }

  override closeDoor(): void {
    this.logOperationUnavailable("closeDoor");
  }
}
