import React from "react";
import { render } from "react-dom";

import { Routes } from "./Routes";
import "./index.css";

const startApp = () => {
  render(<Routes />, document.getElementById("root"));
};

startApp();
