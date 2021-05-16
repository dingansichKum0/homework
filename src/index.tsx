import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./index.css";

const startApp = () => {
  render(<App />, document.getElementById("root"));
};

startApp();
