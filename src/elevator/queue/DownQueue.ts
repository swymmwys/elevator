import ElevatorQueue from "./ElevatorQueue";

export default class DownQueue extends ElevatorQueue {
  constructor(onChange?: (queue: number[]) => void) {
    super((nextFloor, floor) => nextFloor < floor, onChange);
  }
}
