import { IElevator } from "elevator/IElevator";

export interface Command<D = unknown> {
  name: Exclude<keyof IElevator, "getStatus">;
  data: D;
}

export function createCommand<Data>(json: string): Command<Data> | null {
  let command: Command<Data> | null = null;

  try {
    command = JSON.parse(json);
  } catch (e) {
    return null;
  }

  return command;
}

export type CallData = { from: number; direction: "up" | "down" };
export type SelectFloorData = { floor: number };
