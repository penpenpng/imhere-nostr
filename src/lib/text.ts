export function displayLatLng(latLng: [number, number]) {
  const [lat, lng] = latLng.map((v) => Math.round(v * 10 ** 6) / 10 ** 6);
  return `(${lat}, ${lng})`;
}
