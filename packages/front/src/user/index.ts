import { Signal } from "@preact/signals";

export type UserLocation = "on-the-floor" | "inside-elevator";

export type User = Readonly<{
  location: Signal<UserLocation>;
  currentFloor: Signal<number | null>;
  requestedFloor: Signal<number | null>;
}>;
