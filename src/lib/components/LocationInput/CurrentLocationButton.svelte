<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Place } from "../../nominatim";
  import { geolocationImplemented, getCurrentPlace } from "../../getlocation";

  let processing = false;

  const dispatch = createEventDispatcher<{
    input: { place: Place };
  }>();

  async function dispatchCurrentLocation() {
    processing = true;

    try {
      const place = await getCurrentPlace();

      dispatch("input", { place });
      processing = false;
    } catch (error) {
      processing = false;
      alert(`Failed to get the current location: ${error}`);
    }
  }
</script>

{#if geolocationImplemented}
  <div class="field">
    <div class="control">
      <button
        class="button is-primary is-fullwidth"
        class:is-loading={processing}
        on:click={dispatchCurrentLocation}>Move to your location</button
      >
    </div>
  </div>
{/if}
