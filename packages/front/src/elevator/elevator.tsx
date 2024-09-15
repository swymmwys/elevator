import { FunctionComponent } from "preact";
import { OnTheFloor } from "./states/on-the-floor";
import { InsideElevator } from "./states/inside-elevator";
import { StateContext } from "../state/state-context";
import { useContext } from "preact/hooks";

export const Elevator: FunctionComponent = () => {
  const state = useContext(StateContext);

  switch (state.user.location.value) {
    case "on-the-floor": {
      return <OnTheFloor />;
    }
    case "inside-elevator": {
      return <InsideElevator />;
    }
    default: {
      return null;
    }
  }
};
