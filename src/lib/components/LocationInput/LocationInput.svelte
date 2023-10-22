<script lang="ts">
  import type { Place } from "../../nominatim";
  import CurrentLocationButton from "./CurrentLocationButton.svelte";
  import LocationSearch from "./LocationSearch.svelte";
  import { Map } from "./Map";

  let place: Place;

  function setPlace(ev: CustomEvent<{ place: Place }>) {
    place = ev.detail.place;
  }
</script>

<Map on:input point={place} />

<div class="my-2 mx-4">
  <div class="my-4">
    <CurrentLocationButton on:input={setPlace} />
  </div>
  <LocationSearch on:input={setPlace} />
</div>
