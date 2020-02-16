class App {
  async start() {
    const info = document.querySelector("#info");
    const floorSelector = document.querySelector("#floorSelector");

    this.websocket = new WebSocket("ws://localhost:3000");
    this.websocket.addEventListener("message", event => {
      info.innerHTML = event.data;
    });

    document.body
      .querySelector("#callUp")
      .addEventListener("click", () => {
        this.send({ name: "callUp", from: floorSelector.value });
        floorSelector.value = "";
      });

    document.body
      .querySelector("#callDown")
      .addEventListener("click", () => {
        this.send({ name: "callDown", from: floorSelector.value });
        floorSelector.value = "";
      });

    document.body
      .querySelector("#selectFloor")
      .addEventListener("click", () => {
        this.send({ name: "selectFloor", to: floorSelector.value });
        floorSelector.value = "";
      });

    document.body
      .querySelector("#stop")
      .addEventListener("click", () => {
        this.send({ name: "stop" });  
      });

    document.body
      .querySelector("#continue")
      .addEventListener("click", () => {
        this.send({ name: "continue" });
      });
  }

  send(data) {
    this.websocket.send(JSON.stringify(data));
  }
}

new App().start();
