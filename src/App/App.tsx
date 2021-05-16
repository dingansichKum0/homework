import React, { useRef } from "react";
import { makeStyles } from "@material-ui/styles";

import { Map } from "./Map";
import { Menu } from "./Menu";

const useStyles = makeStyles({
  app: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    height: "100vh",
    "@media(max-width: 780px)": {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "60% 40%",
    },
  },
});

interface Props {}

export const App: React.SFC<Props> = ({ children }) => {
  const classes = useStyles();
  const mapRef = useRef();

  return (
    <div className={classes.app}>
      <Map ref={mapRef}></Map>
      <Menu mapRef={mapRef}></Menu>
    </div>
  );
};
