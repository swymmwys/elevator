import { Signal } from "@preact/signals";
import { Direction, ElevatorStatus } from "../elevator/elevator-status";
import { createContext } from "preact";

// todo: share Commands API types
export class Api {
  private readonly ws = new WebSocket("ws://localhost:3000");

  constructor(private readonly elevator: Signal<ElevatorStatus>) {
    this.ws.addEventListener("message", this.messageHandler);
  }

  private messageHandler = async (event: MessageEvent) => {
    this.elevator.value = JSON.parse(event.data);
  };

  selectFloor(floor: number): void {
    this.ws.send(JSON.stringify({ name: "selectFloor", data: { floor } }));
  }

  call(floor: number, direction: Direction): void {
    this.ws.send(
      JSON.stringify({ name: "call", data: { from: floor, direction } }),
    );
  }

  openDoor(): void {
    this.ws.send(JSON.stringify({ name: "openDoor" }));
  }

  closeDoor(): void {
    this.ws.send(JSON.stringify({ name: "closeDoor" }));
  }

  callHelp(): void {
    this.ws.send(JSON.stringify({ name: "callHelp" }));
  }
}

// todo: fix
// @ts-expect-error: not good, but will be initialized on app startup
export const ApiContext = createContext<Api>(null);
