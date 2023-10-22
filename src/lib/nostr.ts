import type { Place } from "./nominatim";

export interface PostParams {
  content: string;
  place: Place;
}

export async function postContentWithLocation(params: PostParams) {
  let message: string;
  try {
    const event = await window.nostr.signEvent({
      kind: 1,
      tags: [["g", params.place.geohash]],
      content: params.content,
      created_at: Math.floor(Date.now() / 1000),
    });

    message = JSON.stringify(["EVENT", event]);
  } catch (err) {
    console.error(err);
    throw new Error();
  }

  const relays = await getRelays();

  for (const relay of relays) {
    try {
      send(relay, message);
    } catch {
      // do nothing
    }
  }
}

async function getRelays(): Promise<string[]> {
  const FALLBACK_RELAYS = [
    "wss://yabu.me",
    "wss://nos.lol",
    "wss://relay.damus.io",
  ];

  try {
    const result = await window.nostr.getRelays?.();
    if (!result) {
      return FALLBACK_RELAYS;
    }

    const relays = Object.entries(result)
      .filter(([, { write }]) => write)
      .map(([url]) => url);

    if (relays.length <= 0) {
      return FALLBACK_RELAYS;
    }

    return relays;
  } catch {
    return FALLBACK_RELAYS;
  }
}

function send(relay: string, message: string) {
  const socket = new WebSocket(relay);

  socket.onopen = () => {
    socket.send(message);
  };
  socket.onmessage = () => {
    socket.close();
  };

  setTimeout(() => {
    socket.close();
  }, 3000);
}
