import IElevator from "./IElevator";
import StateMachine from "../fsm/StateMachine";
import IdleState from "./states/IdleState";
import ElevatorController from "./ElevatorController";
import MovingUpState from "./states/MovingUpState";
import MovingDownState from "./states/MovingDownState";
import BaseElevatorState from "./states/BaseElevatorState";
import ArrivedState from "./states/ArrivedState";
import StopState from "./states/StopState";
import ElevatorStatus from "./ElevatorStatus";
import ElevatorDoor from "./ElevatorDoor";

export default class ElevatorMachine extends StateMachine<BaseElevatorState> implements IElevator {
  private constructor(onChange?: (status: ElevatorStatus) => void) {
    super(()=> onChange && onChange(this.getStatus()));

    const controller = new ElevatorController(() => this.currentState, onChange);
    const door = new ElevatorDoor();

    const idleState = new IdleState(this, controller, door);
    const movingUpState = new MovingUpState(this, controller, door);
    const movingDownState = new MovingDownState(this, controller, door);
    const arrivedState = new ArrivedState(this, controller, door);
    const stopState = new StopState(this, controller, door);

    this.addTransition(idleState, "MoveUp", movingUpState);
    this.addTransition(idleState, "MoveDown", movingDownState);
    this.addTransition(idleState, "Arrived", arrivedState);

    this.addTransition(arrivedState, "MoveUp", movingUpState);
    this.addTransition(arrivedState, "MoveDown", movingDownState);
    this.addTransition(arrivedState, "Idle", idleState);

    this.addTransition(movingUpState, "Arrived", arrivedState);
    this.addTransition(movingUpState, "Stop", stopState);
    this.addTransition(movingDownState, "Arrived", arrivedState);
    this.addTransition(movingDownState, "Stop", stopState);

    this.addTransition(stopState, "MoveUp", movingUpState);
    this.addTransition(stopState, "MoveDown", movingDownState);
    this.addTransition(stopState, "Idle", idleState);

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

  public callUpFrom(floor: number): void {
    this.currentState.callUpFrom(floor);
  }

  public callDownFrom(floor: number): void {
    this.currentState.callDownFrom(floor);
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

  public getStatus(): ElevatorStatus {
    return this.currentState.getStatus();
  }
}
