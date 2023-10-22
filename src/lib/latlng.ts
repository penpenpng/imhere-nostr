export function displayLatLng(latLng: [number, number]) {
  const [lat, lng] = latLng.map((v) => Math.round(v * 10 ** 6) / 10 ** 6);
  return `(${lat}, ${lng})`;
}

export function normalizeLatLng([lat, lng]: [number, number]): [
  number,
  number,
] {
  return [modPositive(lat + 90, 180) - 90, modPositive(lng + 180, 360) - 180];
}

function modPositive(a: number, b: number): number {
  return ((a % b) + b) % b;
}
