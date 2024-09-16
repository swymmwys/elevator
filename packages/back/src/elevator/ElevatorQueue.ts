export abstract class ElevatorQueue {
  protected queue: number[] = [];

  abstract get next(): number | null;

  add(floor: number): void {
    let nextIndex = 0;

    while (floor > (this.queue[nextIndex] ?? floor)) {
      nextIndex++;
    }

    if (floor === this.queue[nextIndex]) {
      return;
    }

    console.log(`nextIndex: ${nextIndex}; floor: ${floor}`);

    this.queue.splice(nextIndex, 0, floor);
  }

  abstract poll(): void;

  abstract toArray(): number[];

  flush(): void {
    this.queue.length = 0;
  }

  size(): number {
    return this.queue.length;
  }
}

export class UpQ extends ElevatorQueue {
  override get next(): number | null {
    return this.queue[0] ?? null;
  }

  override toArray(): number[] {
    return this.queue.slice(0);
  }

  override poll(): void {
    this.queue.shift();
  }
}
export class DownQ extends ElevatorQueue {
  override get next(): number | null {
    return this.queue.at(-1) ?? null;
  }

  override toArray(): number[] {
    return this.queue.slice(0).reverse();
  }

  override poll(): void {
    this.queue.pop();
  }
}
