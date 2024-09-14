import { Event } from "fsm/Event";

export class ArrivedEvent extends Event {
  static name = "ArrivedEvent";

  constructor(public readonly floor: number) {
    super(ArrivedEvent.name);
  }
}
