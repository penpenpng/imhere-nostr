<script lang="ts">
  import LocationInput from "./lib/components/LocationInput/LocationInput.svelte";
  import PostNoteModal from "./lib/components/PostNoteModal.svelte";
  import type { Place } from "./lib/nominatim";
  import type { MapPoint } from "./lib/types";

  let showModal = false;
  let place: Place;

  async function openPostNoteModal(mapPoint: MapPoint) {
    place = await mapPoint.place;
    showModal = true;
  }
</script>

<LocationInput
  on:input={(ev) => {
    openPostNoteModal(ev.detail.mapPoint);
  }}
/>

<footer class="mx-4 mt-6 has-text-centered is-size-7 has-text-grey">
  Author: <a
    href="https://njump.me/npub133vj8ycevdle0cq8mtgddq0xtn34kxkwxvak983dx0u5vhqnycyqj6tcza"
    target="_blank"
  >
    penpenpng
  </a>, Source:
  <a href="https://github.com/penpenpng/imhere-nostr" target="_blank">
    GitHub
  </a>, License:
  <a
    href="https://github.com/penpenpng/imhere-nostr/blob/main/LICENSE"
    target="_blank"
  >
    MIT
  </a>
</footer>

{#if showModal}
  <PostNoteModal {place} on:close={() => void (showModal = false)} />
{/if}
