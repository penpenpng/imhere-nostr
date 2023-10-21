import "./app.css";
import type { Nip07 } from "nostr-typedef";

import App from "./App.svelte";

declare global {
  var nostr: Nip07.Nostr;
}

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
