import Event from "./Event";

export default interface IEventEmitter {
  emit(event: Event): void;
}
