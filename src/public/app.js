class App {
  async start() {
    const info = document.querySelector("#info");
    const floorSelector = document.querySelector("#floorSelector");
    const floorDisplay = document.querySelector("#floorDisplay");
    const currentFloor = document.querySelector("#currentFloor");
    const currentQueue = document.querySelector("#currentQueue");

    this.websocket = new WebSocket("ws://localhost:3000");
    this.websocket.addEventListener("message", event => {
      const data = JSON.parse(event.data);
      info.innerHTML = event.data;
      currentFloor.innerHTML = data.currentFloor;
      floorDisplay.className = data.direction == 'none' ? '' : data.direction;
      currentQueue.innerHTML = data.queue.join('<br />');
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

    // document.body
    //   .querySelector("#stop")
    //   .addEventListener("click", () => {
    //     this.send({ name: "stop" });  
    //   });

    // document.body
    //   .querySelector("#continue")
    //   .addEventListener("click", () => {
    //     this.send({ name: "continue" });
    //   });
  }

  send(data) {
    this.websocket.send(JSON.stringify(data));
  }
}

new App().start();
