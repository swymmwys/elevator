import { Event } from "./Event";
import { IEventEmitter } from "./IEventEmitter";
import { BaseState } from "./BaseState";
import * as console from "node:console";

export abstract class StateMachine<T extends BaseState>
  implements IEventEmitter
{
  private _currentState: T | null = null;

  protected get currentState(): T {
    if (!this._currentState) {
      throw new Error("StateMachine: state is not initialized");
    }

    return this._currentState;
  }

  protected set currentState(value: T) {
    this._currentState = value;
  }

  protected readonly transitions = new Map<T, Map<string, T>>();

  protected addTransition(from: T, eventName: string, to: T): void {
    let transition = this.transitions.get(from);

    if (transition == null) {
      transition = new Map<string, T>();

      this.transitions.set(from, transition);
    }

    if (transition.has(eventName)) {
      console.warn(
        `StateMachine: overriding existing transition for event: ${eventName}`,
      );
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

        console.info(
          `StateMachine: transition from "${this.currentState.constructor.name}" to "${nextState.constructor.name}" caused by "${event.name}"`,
        );

        this.currentState.deactivate(event);
        this.currentState = nextState;
        this.currentState.activate(event);

        // this.onChange?.();
      } else {
        console.warn(
          `StateMachine: no state is configured to transition from "${this.currentState.constructor.name}" by event: ${event.name}`,
        );
      }
    } else {
      console.warn(
        `StateMachine: no transition to handle "${event.name}" in ${this.currentState.constructor.name} state`,
      );
    }
  }
}
