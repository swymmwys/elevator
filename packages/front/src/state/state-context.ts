import { createContext } from "preact";
import { State } from "./state";

export const StateContext = createContext<State>({
  // todo: fix
  // @ts-expect-error: not good, but will be initialized on app startup
  user: null,
  // todo: fix
  // @ts-expect-error: not good, but will be initialized on app startup
  elevator: null,
});
