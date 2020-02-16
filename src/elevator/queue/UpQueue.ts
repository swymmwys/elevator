import ElevatorQueue from "./ElevatorQueue";

export default class UpQueue extends ElevatorQueue {
  constructor(onChange?: (queue: number[]) => void) {
    super((nextFloor, floor) => nextFloor > floor, onChange);
  }
}
