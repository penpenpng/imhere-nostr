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
<CurrentLocationButton on:input={setPlace} />
<LocationSearch on:input={setPlace} />
