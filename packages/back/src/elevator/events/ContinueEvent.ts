import { Event } from "fsm/Event";

export class ContinueEvent extends Event {
  static name = "ContinueEvent";

  constructor() {
    super(ContinueEvent.name);
  }
}
