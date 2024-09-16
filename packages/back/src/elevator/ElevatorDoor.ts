export type DoorStatus = "closed" | "open" | "closing" | "opening";

// todo: should be implemented with FSM as well
export class ElevatorDoor {
  private openDoorTimeout: NodeJS.Timeout | null = null;
  private closeDoorTimeout: NodeJS.Timeout | null = null;

  private activeMotion: Promise<void> | null = null;
  private readonly motionTimeMs: number = 500;

  private _status: DoorStatus = "closed";

  public onChange?: (status: DoorStatus) => void;

  public get status(): DoorStatus {
    return this._status;
  }

  public close(): Promise<void> {
    if (this._status === "closed") {
      return Promise.resolve();
    }

    if (this._status === "closing" && this.activeMotion !== null) {
      return this.activeMotion;
    }

    if (this._status === "opening" && this.openDoorTimeout !== null) {
      clearTimeout(this.openDoorTimeout);
    }

    const { promise, resolve } = Promise.withResolvers<void>();

    this.activeMotion = promise;
    this._status = "closing";

    this.onChange?.(this._status);

    this.closeDoorTimeout = setTimeout(() => {
      this._status = "closed";
      this.activeMotion = null;
      this.closeDoorTimeout = null;

      this.onChange?.(this._status);

      resolve();
    }, this.motionTimeMs);

    return promise;
  }

  public async open(): Promise<void> {
    if (this._status === "open") {
      return Promise.resolve();
    }

    if (this._status === "opening" && this.activeMotion !== null) {
      return this.activeMotion;
    }

    if (this._status === "closing" && this.closeDoorTimeout !== null) {
      clearTimeout(this.closeDoorTimeout);
    }

    const { promise, resolve } = Promise.withResolvers<void>();

    this.activeMotion = promise;
    this._status = "opening";
    this.onChange?.(this._status);

    this.openDoorTimeout = setTimeout(() => {
      this._status = "open";
      this.activeMotion = null;
      this.openDoorTimeout = null;

      this.onChange?.(this._status);

      resolve();
    }, this.motionTimeMs);

    return promise;
  }
}
