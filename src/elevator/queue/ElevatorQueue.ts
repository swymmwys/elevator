export default class ElevatorQueue {
  protected queue: number[] = [];

  constructor(
    protected readonly findSpotBefore: (
      nextFloor: number,
      floor: number
    ) => boolean,
    protected readonly onChange?: (queue: number[]) => void
  ) {}

  public get next(): number {
    return this.queue[0];
  }

  public add(floor: number): void {
    if (floor in this.queue || !floor) {
      return;
    }

    const floorBefore = this.queue.find(nextFloor => {
      return this.findSpotBefore(nextFloor, floor);
    });

    if (floorBefore) {
      const floorBeforeIndex = this.queue.indexOf(floorBefore);
      this.queue.splice(floorBeforeIndex, 0, floor);
    } else {
      this.queue.push(floor);
    }

    this.callOnChange();
  }

  public poll(): void {
    this.queue.shift();
    this.callOnChange();
  }

  public addFrom(queue: ElevatorQueue): void {
    // elements should be in appropriate order, not just concatenated
    this.queue = this.queue.concat(queue.flush());
    this.callOnChange();
  }

  public toArray(): number[] {
    return this.queue.slice(0);
  }

  public flush(): number[] {
    const queue = this.queue.slice();
    this.queue.length = 0;
    return queue;
  }

  private callOnChange(): void {
    this.onChange?.call(null, this.queue.slice());
  }
}
