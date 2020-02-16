import Event from "../../fsm/Event";

export default class MoveDownEvent extends Event {
  constructor() {
    super("MoveDown");
  }
}
