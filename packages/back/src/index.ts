import express from "express";
import * as WebSocket from "ws";
import { ElevatorMachine } from "elevator/ElevatorMachine";
import { ElevatorStatus } from "elevator/ElevatorStatus";
import { Api } from "api";
import { createCommand } from "api/commands";

const app = express();

const server = app.listen(3000);

const ws = new WebSocket.Server({
  server,
});

const elevator = ElevatorMachine.create((status: ElevatorStatus) => {
  ws.clients.forEach((ws) => ws.send(JSON.stringify(status)));
});

const api = new Api(elevator);

ws.addListener("connection", (client: WebSocket.WebSocket) => {
  client.send(JSON.stringify(elevator.getStatus()));

  client.addEventListener("message", (event) => {
    const command = createCommand(event.data.toString());

    if (command) {
      api.handleCommand(command);
    }
  });
});
