import IEventEmitter from "./IEventEmitter";
import Event from "./Event";

export default abstract class BaseState {
  constructor(protected readonly eventEmitter: IEventEmitter) {}

  protected active = false;

  public get isActive(): boolean {
    return this.active;
  }

  public activate(event?: Event): void {
    this.active = true;
  }

  public deactivate(event?: Event): void {
    this.active = false;
  }
}
