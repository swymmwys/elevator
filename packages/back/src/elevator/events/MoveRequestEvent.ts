import { Event } from "fsm/Event";

export class MoveRequestEvent extends Event {
  static name = "MoveRequestEvent";

  constructor(public readonly floor: number) {
    super(MoveRequestEvent.name);
  }
}
