import Event from "../../fsm/Event";

export default class ArrivedEvent extends Event {
  constructor() {
    super("Arrived");
  }
}
