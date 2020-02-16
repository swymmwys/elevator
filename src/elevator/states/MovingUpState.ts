import MovingState from "./MovingState";
import UpQueue from "../queue/UpQueue";
import Event from "../../fsm/Event";

export default class MovingUpState extends MovingState {
  public selectFloor(floor: number): void {
    if (floor > this.ctrl.currentFloor) {
      this.ctrl.nextFloors!.add(floor);
    } else {
      this.ctrl.upQueue.add(floor);
    }
  }

  public callUpFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public callDownFrom(floor: number): void {
    this.ctrl.downQueue.add(floor);
  }

  public activate(event?: Event): void {
    this.ctrl.useUpQueue();
    super.activate(event);
  }

  // public deactivate(event?: Event): void {
  //   this.ctrl.upQueue.addFrom(this.ctrl.nextFloors!);
  //   super.deactivate(event);
  // }
}
