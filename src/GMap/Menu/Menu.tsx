import React, { useCallback, useState, FC } from "react";
import { makeStyles } from "@material-ui/styles";
import { openShp } from "shapefile";

import { Marker, IMarker } from "src/GMap/services";
import { Button } from "src/GMap/components";
import { IMapHandle } from "../Map";

const useStyles = makeStyles({
  menu: {
    overflowY: "scroll",
  },
  ul: {
    overflowY: "auto",
    height: "calc(100% - 48px)",
    "&>li": {
      padding: "4px 10px",
      cursor: "pointer",
    },
  },
});

interface Props {
  mapRef: React.RefObject<IMapHandle>;
}

export const Menu: FC<Props> = ({ mapRef }) => {
  const classes = useStyles();
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const handleClick = useCallback(
    (value: IMarker) => () => {
      if (mapRef.current) {
        mapRef.current.handle(value);
      }
    },
    []
  );

  const fileReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = (e) => {
      openShp(e.target.result)
        .then((source) =>
          source.read().then(function log(result) {
            if (result.done) {
              return;
            }

            if (mapRef.current) {
              mapRef.current.file(result.value as any);
            }

            return source.read().then(log);
          })
        )
        .catch((error) => console.error(error.stack));
    };
  };

  const makeMarkers = () => {
    setMarkers(Marker.make(500));
  };

  return (
    <div className={classes.menu}>
      <Button onClick={makeMarkers}>btn</Button>
      <input type="file" onChange={fileReader} />
      <ul className={classes.ul}>
        {markers.map((i) => (
          <li key={i.index} onClick={handleClick(i)}>
            Marker: {i.index}
          </li>
        ))}
      </ul>
    </div>
  );
};
