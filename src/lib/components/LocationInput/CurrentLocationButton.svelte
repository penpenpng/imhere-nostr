<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Place } from "../../nominatim";
  import { geolocationImplemented, getCurrentPlace } from "../../getlocation";

  const dispatch = createEventDispatcher<{
    input: { place: Place };
  }>();

  async function dispatchCurrentLocation() {
    try {
      const place = await getCurrentPlace();

      dispatch("input", { place });
    } catch (error) {
      alert(`Failed to get the current location: ${error}`);
    }
  }
</script>

{#if geolocationImplemented}
  <button
    class="button is-primary is-fullwidth"
    on:click={dispatchCurrentLocation}>Move to the current location</button
  >
{/if}
