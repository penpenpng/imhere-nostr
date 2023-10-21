<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Place } from "../../nominatim";
  import { geolocationImplemented, getCurrentPlace } from "../../getlocation";

  const dispatch = createEventDispatcher<{
    found: { place: Place };
    error: { error: unknown };
  }>();

  async function dispatchCurrentLocation() {
    try {
      const place = await getCurrentPlace();

      dispatch("found", { place });
    } catch (error) {
      dispatch("error", { error });
    }
  }
</script>

{#if geolocationImplemented}
  <button on:click={dispatchCurrentLocation}>Current</button>
{/if}
