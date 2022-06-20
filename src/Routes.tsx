import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Routes as Rroutes,
  Route,
} from "react-router-dom";
import { GMap } from "./GMap";

const A = () => {
  return <div>a</div>;
};

export const Routes = (): ReactElement => {
  return (
    <Router>
      <Rroutes>
        <Route path="/" element={<A />} />
        <Route path="/gmap" element={<GMap />} />
      </Rroutes>
    </Router>
  );
};
