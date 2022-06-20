import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMap } from "src/GMap/hooks";
import { Button } from "src/GMap/components";
import { IMarker, Color } from "src/GMap/services";
import { IShpResult } from "src/GMap/interfaces";

const useStyles = makeStyles({
  mapWrapper: {
    position: "relative",
  },
  map: {
    height: "100%",
  },
  btn: {
    position: "absolute",
    top: 0,
  },
});

interface Props {}

export interface IMapHandle {
  handle(value: IMarker): void;
  file(value: IShpResult): void;
}

const MapRef: React.RefForwardingComponent<IMapHandle, Props> = ({}, ref) => {
  const classes = useStyles();
  const mapEl = useRef<HTMLDivElement>();
  const triangleCoordsRef = useRef<IMarker[]>([]);
  const polygonInstanceRef = useRef<google.maps.Polygon>();

  const mapInstanceRef = useMap(mapEl, {
    scaleControl: true,
    center: { lat: 30.663333251447835, lng: 104.06523050344862 },
    zoom: 5,
  });

  useImperativeHandle(ref, () => ({
    handle: (value) => {
      new google.maps.Marker({
        position: value,
        map: mapInstanceRef.current,
        title: `Marker: ${value.index}`,
      });

      mapInstanceRef.current.setCenter(value);

      triangleCoordsRef.current.push(value);
    },
    file: (value) => {
      const drawPolygon = (paths: IMarker[]) => {
        const polygonInstance = new google.maps.Polygon({
          paths,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });

        polygonInstance.setMap(mapInstanceRef.current);
      };

      if (value.type === "MultiPolygon") {
        for (let i = 0; i < value.coordinates.length; i++) {
          for (let j = 0; j < value.coordinates[i].length; j++) {
            value.coordinates[i][j] = (value.coordinates[i][j] as any).map(
              (j) => ({
                lat: j[1],
                lng: j[0],
              })
            );
          }
        }
        value.coordinates.forEach((i) => {
          i.forEach((j) => drawPolygon(j as IMarker[]));
        });
      } else {
        for (let i = 0; i < value.coordinates.length; i++) {
          value.coordinates[i] = (value.coordinates[i] as any).map((j) => ({
            lat: j[1],
            lng: j[0],
          })) as any;
        }
        value.coordinates.forEach((i) => drawPolygon(i as IMarker[]));
      }
    },
  }));

  const handleRightClick = () => {
    polygonInstanceRef.current = new google.maps.Polygon({
      paths: triangleCoordsRef.current,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    polygonInstanceRef.current.setMap(mapInstanceRef.current);
    triangleCoordsRef.current = [];
  };

  const handlePolygonClick = () => {
    if (polygonInstanceRef.current) {
      polygonInstanceRef.current.setOptions({
        fillColor: Color.makeRandom(),
      });
    }
  };

  return (
    <div className={classes.mapWrapper}>
      <div
        className={classes.map}
        ref={mapEl}
        onContextMenu={handleRightClick}
      ></div>
      <Button className={classes.btn} onClick={handlePolygonClick}>
        polygon
      </Button>
    </div>
  );
};

export const Map = forwardRef(MapRef);
