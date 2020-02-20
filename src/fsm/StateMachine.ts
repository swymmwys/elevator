import Event from "./Event";
import IEventEmitter from "./IEventEmitter";
import BaseState from "./BaseState";

export default abstract class StateMachine<T extends BaseState> implements IEventEmitter {
  protected currentState!: T;
  protected readonly transitions = new Map<T, Map<string, T>>();

  protected constructor(private readonly onChange?: () => void) {
  }

  protected addTransition(from: T, eventName: string, to: T): void {
    let transition = this.transitions.get(from);

    if (transition == null) {
      transition = new Map<string, T>();
      this.transitions.set(from, transition);
    }

    transition.set(eventName, to);
  }

  public emit(event: Event): void {
    const transition = this.transitions.get(this.currentState);

    if (transition) {
      const nextState = transition.get(event.name);

      if (nextState) {
        if (nextState == this.currentState) {
          return;
        }

        this.currentState.deactivate(event);
        this.currentState = nextState;
        this.currentState.activate(event);

        this.onChange && this.onChange();
      } else {
        console.warn(`There is no transition for event: ${event.name}`);
      }
    } else {
      console.warn("There is no configuration for the current state");
    }
  }
}
