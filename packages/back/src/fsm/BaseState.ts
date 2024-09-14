import { IEventEmitter } from "./IEventEmitter";
import { Event } from "./Event";

export abstract class BaseState {
  protected constructor(protected readonly eventEmitter: IEventEmitter) {}

  protected active = false;

  public get isActive(): boolean {
    return this.active;
  }

  public activate(_event: Event): void {
    this.active = true;
  }

  public deactivate(_event: Event): void {
    this.active = false;
  }
}
