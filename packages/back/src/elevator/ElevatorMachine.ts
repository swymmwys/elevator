import { StateMachine } from "fsm/StateMachine";
import { IdleState } from "./states/IdleState";
import { ElevatorController } from "./ElevatorController";
import { BaseElevator } from "elevator/BaseElevator";
import { ArrivedState } from "./states/ArrivedState";
import { StopState } from "./states/StopState";
import { ElevatorStatus } from "./ElevatorStatus";
import { ElevatorDoor } from "./ElevatorDoor";
import { Direction, IElevator } from "elevator/IElevator";
import { MovingState } from "elevator/states/MovingState";
import { MoveRequestEvent } from "elevator/events/MoveRequestEvent";
import { ArrivedEvent } from "elevator/events/ArrivedEvent";
import { IdleEvent } from "elevator/events/IdleEvent";
import { StopEvent } from "elevator/events/StopEvent";
import { ContinueEvent } from "elevator/events/ContinueEvent";

export class ElevatorMachine
  extends StateMachine<BaseElevator>
  implements IElevator
{
  private constructor(onChange?: (status: ElevatorStatus) => void) {
    super();

    const door = new ElevatorDoor();
    const ctrl = new ElevatorController(door, onChange);

    const idleState = new IdleState(this, ctrl);
    const movingState = new MovingState(this, ctrl);
    const arrivedState = new ArrivedState(this, ctrl);
    const stopState = new StopState(this, ctrl);

    this.addTransition(idleState, MoveRequestEvent.name, movingState);
    this.addTransition(idleState, ArrivedEvent.name, arrivedState);

    this.addTransition(arrivedState, ContinueEvent.name, movingState);
    this.addTransition(arrivedState, IdleEvent.name, idleState);

    this.addTransition(movingState, ArrivedEvent.name, arrivedState);
    this.addTransition(movingState, StopEvent.name, stopState);

    this.addTransition(stopState, ContinueEvent.name, movingState);
    this.addTransition(stopState, IdleEvent.name, idleState);

    this.currentState = idleState;
  }

  static create(onChange?: (status: ElevatorStatus) => void): IElevator {
    return new ElevatorMachine(onChange);
  }

  public stop(): void {
    this.currentState.stop();
  }

  public continue(): void {
    this.currentState.continue();
  }

  public selectFloor(floor: number): void {
    this.currentState.selectFloor(floor);
  }

  public call(floor: number, direction: Direction): void {
    this.currentState.call(floor, direction);
  }

  public openDoor(): void {
    this.currentState.openDoor();
  }

  public closeDoor(): void {
    this.currentState.closeDoor();
  }

  public callHelp(): void {
    this.currentState.callHelp();
  }

  public getStatus() {
    return this.currentState.getStatus();
  }
}
