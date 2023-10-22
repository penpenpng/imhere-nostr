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

{#if showModal}
  <PostNoteModal {place} on:close={() => void (showModal = false)} />
{/if}
<LocationInput
  on:input={(ev) => {
    openPostNoteModal(ev.detail.mapPoint);
  }}
/>
