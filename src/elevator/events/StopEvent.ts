import Event from "../../fsm/Event";

export default class StopEvent extends Event {
  constructor() {
    super("Stop");
  }
}
