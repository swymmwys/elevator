import ElevatorQueue from "./queue/ElevatorQueue";
import DownQueue from "./queue/DownQueue";
import UpQueue from "./queue/UpQueue";
import ElevatorStatus from "./ElevatorStatus";

export default class ElevatorController {
  private _currentFloor: number = 0;

  get currentFloor(): number {
    return this._currentFloor;
  }

  set currentFloor(floor: number) {
    this._currentFloor = floor;
    this.callOnChange();
  }

  constructor(private readonly onChange?: (status: ElevatorStatus) => void) {}

  public readonly upQueue: ElevatorQueue = new UpQueue();
  public readonly downQueue: ElevatorQueue = new DownQueue();

  private _nextFloors?: ElevatorQueue;

  public get nextFloors(): ElevatorQueue | undefined {
    return this._nextFloors;
  }

  public queueFloor(nextFloor: number): void {
    if (nextFloor == this.currentFloor || !nextFloor) {
      return;
    }

    const upQueue = nextFloor > this.currentFloor ? this.upQueue : null;
    const downQueue = nextFloor < this.currentFloor ? this.downQueue : null;

    (upQueue ?? downQueue)!.add(nextFloor);
  }

  public useUpQueue(): void {
    this._nextFloors =
      this._nextFloors && this.nextFloors instanceof UpQueue
        ? this._nextFloors
        : new UpQueue(() => this.callOnChange());

    this._nextFloors.addFrom(this.upQueue);
  }

  public useDownQueue(): void {
    this._nextFloors =
      this._nextFloors && this.nextFloors instanceof DownQueue
        ? this._nextFloors
        : new DownQueue(() => this.callOnChange());

    this._nextFloors.addFrom(this.downQueue);
  }

  public getDirection(): string {
    const upDirection = this.nextFloors instanceof UpQueue ? "up" : null;
    const downDirection = this.nextFloors instanceof DownQueue ? "down" : null;

    return (upDirection ?? downDirection ?? "none")!;
  }

  public getStatus(): ElevatorStatus {
    return new ElevatorStatus(
      this._nextFloors?.toArray() ?? [],
      this.upQueue.toArray(),
      this.downQueue.toArray(),
      this.currentFloor,
      this.getDirection()
    );
  }

  private callOnChange(): void {
    this.onChange?.call(null, this.getStatus());
  }
}
