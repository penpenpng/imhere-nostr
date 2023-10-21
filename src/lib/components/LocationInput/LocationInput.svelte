<script lang="ts">
  import type { Place } from "../../nominatim";
  import CurrentLocationButton from "./CurrentLocationButton.svelte";
  import LocationSearch from "./LocationSearch.svelte";
  import { Map } from "./Map";

  let place: Place;
</script>

<LocationSearch
  on:found={(ev) => {
    place = ev.detail.places[0];
  }}
  on:error
/>
<CurrentLocationButton
  on:found={(ev) => {
    place = ev.detail.place;
  }}
/>
<Map on:input point={place} />
