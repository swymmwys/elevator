import { DownQ, ElevatorQueue, UpQ } from "elevator/ElevatorQueue";
import { Direction } from "elevator/IElevator";
import { ElevatorStatus } from "elevator/ElevatorStatus";
import { ElevatorDoor } from "elevator/ElevatorDoor";

export class ElevatorController {
  private _currentFloor: number = 0;

  constructor(
    readonly door: ElevatorDoor,
    private readonly onChange?: (status: ElevatorStatus) => void,
  ) {
    // todo: I don't like it, but works for now
    door.onChange = () => this.callOnChange();
  }

  getStatus(): ElevatorStatus {
    return {
      currentFloor: this.currentFloor,
      direction: this.direction,
      downQueue: this.downQ.toArray(),
      upQueue: this.upQ.toArray(),
      doorStatus: this.door.status,
    };
  }

  private callOnChange() {
    this.onChange?.(this.getStatus());
  }

  get currentFloor(): number {
    return this._currentFloor;
  }

  set currentFloor(floor: number) {
    this._currentFloor = floor;
    this.callOnChange();
  }

  readonly downQ: ElevatorQueue = new DownQ();
  readonly upQ: ElevatorQueue = new UpQ();

  private _activeQ: ElevatorQueue | null = null;

  useDownQ(): void {
    this._activeQ = this.downQ;

    this.callOnChange();
  }

  useUpQ(): void {
    this._activeQ = this.upQ;

    this.callOnChange();
  }

  get direction(): Direction {
    if (this._activeQ === this.upQ) {
      return "up";
    } else if (this._activeQ === this.downQ) {
      return "down";
    }

    switch (this._activeQ) {
      case this.upQ: {
        return "up";
      }
      case this.downQ: {
        return "down";
      }
      default: {
        return "none";
      }
    }
  }

  get nextFloor(): number | null {
    return this._activeQ?.next ?? null;
  }

  removeNextFloor(): void {
    this._activeQ?.poll();

    if (this._activeQ?.size() === 0) {
      if (this.direction === "down" && this.upQ.size() !== 0) {
        this._activeQ = this.upQ;
      } else if (this.direction === "up" && this.downQ.size() !== 0) {
        this._activeQ = this.downQ;
      } else {
        this._activeQ = null;
      }
    }

    this.callOnChange();
  }

  queueFloor(floor: number): void {
    if (floor > this.currentFloor) {
      this.upQ.add(floor);
    } else {
      this.downQ.add(floor);
    }

    this.callOnChange();
  }

  queueFloorFrom(floor: number, direction: Direction): void {
    const sameDirection = this.direction === direction;

    if (sameDirection && direction === "down" && floor < this.currentFloor) {
      this.downQ.add(floor);
    } else if (
      sameDirection &&
      direction === "up" &&
      floor > this.currentFloor
    ) {
      this.upQ.add(floor);
    } else {
      switch (direction) {
        case "up": {
          this.downQ.add(floor);
          break;
        }
        case "down": {
          this.upQ.add(floor);
          break;
        }
        default:
          break;
      }
    }

    this.callOnChange();
  }
}
