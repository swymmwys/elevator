import { Event } from "fsm/Event";

export class IdleEvent extends Event {
  static name = "IdleEvent";

  constructor() {
    super(IdleEvent.name);
  }
}
