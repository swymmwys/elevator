import { BaseState } from "fsm/BaseState";
import { IEventEmitter } from "fsm/IEventEmitter";
import { ElevatorController } from "elevator/ElevatorController";
import { Direction, IElevator } from "elevator/IElevator";
import { ElevatorStatus } from "elevator/ElevatorStatus";

export abstract class BaseElevator extends BaseState implements IElevator {
  constructor(
    eventEmitter: IEventEmitter,
    protected readonly ctrl: ElevatorController,
  ) {
    super(eventEmitter);
  }

  abstract call(floor: number, direction: Direction): void;

  abstract selectFloor(floor: number): void;

  abstract stop(): void;

  abstract openDoor(): void;

  abstract closeDoor(): void;

  public callHelp(): void {
    console.warn("Help!");
  }

  abstract continue(): void;

  protected logOperationUnavailable(operation: string): void {
    console.warn(
      `Operation "${operation}" is unavailable in state ${this.constructor.name}`,
    );
  }

  getStatus(): ElevatorStatus {
    return this.ctrl.getStatus();
  }
}
