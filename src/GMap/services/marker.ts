export interface IMarker {
  lat: number;
  lng: number;
  index: number;
}

export class Marker {
  static make(len: number): IMarker[] {
    const r = [];
    for (let i = 0; i < len; i++) {
      r.push({
        lat: Marker.makeRandom(-90, 90),
        lng: Marker.makeRandom(-180, 180),
        index: i,
      });
    }
    return r;
  }

  static makeRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
