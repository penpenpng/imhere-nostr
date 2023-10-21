<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { MapPoint } from "../../../types";
  import Marker from "./Marker.svelte";

  export let mapPoint: MapPoint;

  const dispatch = createEventDispatcher<{ input: { mapPoint: MapPoint } }>();

  function displayLatLng(latLng: [number, number]) {
    const [lat, lng] = latLng.map((v) => Math.round(v * 10 ** 6) / 10 ** 6);
    return `(${lat}, ${lng})`;
  }
</script>

<Marker latLng={mapPoint.latLng}>
  {#await mapPoint.place}
    Loading...
  {:then place}
    {#if place.name}
      <b>{place.name}</b>
    {:else}
      <b class="has-text-grey-light">{displayLatLng(place.latLng)}</b>
    {/if}
    <br />
    {place.display_name ?? ""}
    <button
      class="button is-info is-small is-fullwidth"
      on:click={() => dispatch("input", { mapPoint })}>Post</button
    >
  {:catch err}
    <span class="has-text-danger">{err}</span>
  {/await}
</Marker>
