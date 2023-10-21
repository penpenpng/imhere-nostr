import { reverse } from "./nominatim";

export const geolocationImplemented =
  !!navigator?.geolocation?.getCurrentPosition;

export function getCurrentLocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getCurrentPlace() {
  const { coords } = await getCurrentLocation();
  const latLng: [number, number] = [coords.latitude, coords.longitude];

  return reverse(latLng);
}
