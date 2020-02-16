import Event from "../../fsm/Event";

export default class IdleEvent extends Event {
  constructor() {
    super("Idle");
  }
}
