import { IElevator } from "elevator/IElevator";
import { CallData, Command, SelectFloorData } from "api/commands";

export class Api {
  constructor(private elevator: IElevator) {}

  // todo: add command.data validation or create schema for models mapping
  public handleCommand(command: Command): void {
    console.log("API: handleCommand", command);

    switch (command.name) {
      case "call": {
        const data = command.data as CallData;

        this.elevator.call(data.from, data.direction);
        break;
      }
      case "selectFloor": {
        const data = command.data as SelectFloorData;

        this.elevator.selectFloor(data.floor);
        break;
      }
      case "openDoor": {
        this.elevator.openDoor();
        break;
      }
      case "closeDoor": {
        this.elevator.closeDoor();
        break;
      }
      case "stop": {
        this.elevator.stop();
        break;
      }
      case "continue": {
        this.elevator.continue();
        break;
      }
      case "callHelp": {
        this.elevator.callHelp();
        break;
      }
      default:
        break;
    }
  }
}
