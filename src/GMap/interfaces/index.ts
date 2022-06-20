export interface IShpResult {
  coordinates: [number, number][][] | [number, number][][][];
  type: "MultiPolygon" | "Polygon";
}
