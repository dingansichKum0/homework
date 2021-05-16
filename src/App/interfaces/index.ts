export interface IShpResult {
  coordinates: [number, number][][];
  type: "MultiPolygon" | "Polygon";
}
