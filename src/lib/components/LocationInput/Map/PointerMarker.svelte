<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { MapPoint } from "../../../types";
  import Marker from "./Marker.svelte";
  import { displayLatLng } from "../../../latlng";

  export let mapPoint: MapPoint;

  const dispatch = createEventDispatcher<{ input: { mapPoint: MapPoint } }>();
</script>

<Marker latLng={mapPoint.latLng}>
  {#await mapPoint.place}
    Loading...
  {:then place}
    <div class="mb-1">
      {#if place.name}
        <b>{place.name}</b>
      {:else}
        <b class="has-text-grey-light">{displayLatLng(place.latLng)}</b>
      {/if}
    </div>

    <div>
      {place.display_name ?? ""}
    </div>

    {#if window.nostr}
      <button
        class="button is-info is-small is-fullwidth mt-2"
        on:click={() => dispatch("input", { mapPoint })}
      >
        Post
      </button>
    {:else}
      <div class="notification is-danger is-light p-2 mt-2">
        Install NIP-07 to share on Nostr
      </div>
    {/if}
  {:catch err}
    <span class="has-text-danger">{err}</span>
  {/await}
</Marker>
