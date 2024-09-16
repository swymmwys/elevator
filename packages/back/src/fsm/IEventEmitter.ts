import { Event } from "./Event";

export interface IEventEmitter {
  emit(event: Event): void;
}
