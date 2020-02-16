import express from "express";
import * as WebSocket from "ws";
import path from "path";
import ElevatorMachine from "./elevator/ElevatorMachine";
import ElevatorStatus from "./elevator/ElevatorStatus";

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use((req, res, next) => {
  res.type("application/json");
  next();
});
app.get("/state", (req, res) => {
  res.send(JSON.stringify({ a: 2 }));
});

const server = app.listen(3000);

const wss = new WebSocket.Server({
  server
});

const elevator = ElevatorMachine.create((status: ElevatorStatus) => {
  wss.clients.forEach(ws => ws.send(JSON.stringify(status)));
});

wss.addListener("connection", ws => {
  // todo ping/pong clients and terminate connections

  ws.send(JSON.stringify(elevator.getStatus()));

  ws.addEventListener("message", event => {
    const data: any = JSON.parse(event.data);
    switch (data.name) {
      case "callUp": {
        elevator.callUpFrom(parseInt(data.from));
        break;
      }
      case "callDown": {
        elevator.callDownFrom(parseInt(data.from));
        break;
      }
      case "selectFloor": {
        elevator.selectFloor(parseInt(data.to));
        break;
      }
      case "openDoor": {
        elevator.openDoor();
        break;
      }
      case "closeDoor": {
        elevator.closeDoor();
        break;
      }
      case "stop": {
        elevator.stop();
        break;
      }
      case "continue": {
        elevator.continue();
        break;
      }
      case "callHelp": {
        elevator.callHelp();
        break;
      }
      default:
        break;
    }
  });
});
