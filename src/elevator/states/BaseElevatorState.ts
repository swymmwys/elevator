import IElevator from "../IElevator";
import BaseState from "../../fsm/BaseState";
import IEventEmitter from "../../fsm/IEventEmitter";
import ElevatorController from "../ElevatorController";
import ElevatorStatus from "../ElevatorStatus";
import ElevatorDoor from "../ElevatorDoor";
import IdleEvent from "../events/IdleEvent";

export default abstract class BaseElevatorState extends BaseState
  implements IElevator {
  constructor(
    eventEmitter: IEventEmitter,
    protected readonly ctrl: ElevatorController,
    protected readonly door: ElevatorDoor
  ) {
    super(eventEmitter);
  }

  abstract stop(): void;
  abstract continue(): void;
  abstract selectFloor(floor: number): void;
  abstract callUpFrom(floor: number): void;
  abstract callDownFrom(floor: number): void;
  abstract openDoor(): void;
  abstract closeDoor(): void;

  public callHelp(): void {
    console.warn("Help!");
  }

  public getStatus(): ElevatorStatus {
    return this.ctrl.getStatus();
  }
}
