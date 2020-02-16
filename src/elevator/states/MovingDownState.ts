import MovingState from "./MovingState";
import Event from "../../fsm/Event";

export default class MovingDownState extends MovingState {
  public selectFloor(floor: number): void {
    if (floor < this.ctrl.currentFloor) {
      this.ctrl.nextFloors!.add(floor);
    } else {
      this.ctrl.downQueue.add(floor);
    }
  }

  public callUpFrom(floor: number): void {
    this.ctrl.upQueue.add(floor);
  }

  public callDownFrom(floor: number): void {
    this.selectFloor(floor);
  }

  public activate(event?: Event): void {
    this.ctrl.useDownQueue();
    super.activate(event);
  }

  // public deactivate(event?: Event): void {
  //   this.ctrl.downQueue.addFrom(this.ctrl.nextFloors!);
  //   super.deactivate(event);
  // }
}
