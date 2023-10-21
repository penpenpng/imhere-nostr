import type { Place } from "./nominatim";

export interface MapPoint {
  latLng: [number, number];
  place: Promise<Place>;
}
