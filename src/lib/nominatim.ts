import Geohash from "latlon-geohash";

/** https://nominatim.org/release-docs/latest/api/Search/ */
export async function search(q: string): Promise<Place[]> {
  const xs = await get<RawPlace[]>(
    "https://nominatim.openstreetmap.org/search",
    {
      q,
      format: "jsonv2",
    }
  );

  return xs.map(toPlace);
}

/** https://nominatim.org/release-docs/latest/api/Reverse/ */
export async function reverse([lat, lon]: [number, number]): Promise<Place> {
  const x = await get<RawPlace>("https://nominatim.openstreetmap.org/reverse", {
    lat: `${lat}`,
    lon: `${lon}`,
    format: "jsonv2",
  });

  return toPlace(x);
}

export interface Place {
  place_id: string;
  latLng: [number, number];
  geohash: string;
  name: string;
  display_name: string;
}

interface RawPlace {
  place_id: string;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
}

async function get<T = unknown>(
  url: string,
  query: Record<string, string>
): Promise<T> {
  const res = await fetch(`${url}?${new URLSearchParams(query)}`);
  return res.json();
}

function toPlace(place: any): Place {
  const lat = Number(place.lat);
  const lng = Number(place.lon);

  return {
    ...place,
    latLng: [lat, lng],
    geohash: Geohash.encode(lat, lng),
  };
}
