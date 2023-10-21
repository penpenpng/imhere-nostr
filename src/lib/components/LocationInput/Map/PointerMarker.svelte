<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { MapPoint } from "../../../types";
  import Marker from "./Marker.svelte";

  export let mapPoint: MapPoint;

  const dispatch = createEventDispatcher<{ input: { mapPoint: MapPoint } }>();
</script>

<Marker latLng={mapPoint.latLng}>
  {#await mapPoint.place}
    Loading...
  {:then place}
    <b>{place.name ?? "No Data"}</b>
    {place.display_name ?? ""}
    <button class="button" on:click={() => dispatch("input", { mapPoint })}
      >Post</button
    >
  {:catch err}
    <span style="color:red;">{err}</span>
  {/await}
</Marker>
