import { render } from "preact";
import { App } from "./app.tsx";
import "./main.module.css";

function throwIfNowRoot(): HTMLElement {
  throw new Error("No root element");
}

render(<App />, document.getElementById("app") ?? throwIfNowRoot());
