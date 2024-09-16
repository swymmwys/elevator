import { Event } from "fsm/Event";

export class StopEvent extends Event {
  static name = "StopEvent";

  constructor(public readonly reason?: string) {
    super(StopEvent.name);
  }
}
