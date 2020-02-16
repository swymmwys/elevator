import Event from "../../fsm/Event";

export default class MoveUpEvent extends Event {
  constructor() {
    super("MoveUp");
  }
}
