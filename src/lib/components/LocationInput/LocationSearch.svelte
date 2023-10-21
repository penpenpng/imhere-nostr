<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Place, search } from "../../nominatim";

  let query = "";
  let processing = false;

  const dispatch = createEventDispatcher<{
    found: { places: Place[] };
    notFound: void;
    error: { error: unknown };
  }>();

  async function performSearch() {
    processing = true;

    try {
      const places = await search(query);
      if (places.length > 0) {
        dispatch("found", { places });
      } else {
        dispatch("notFound");
      }
    } catch (error) {
      dispatch("error", { error });
    }

    processing = false;
  }
</script>

<form on:submit|preventDefault={performSearch}>
  <input type="text" bind:value={query} />
  <input type="submit" value="Search" disabled={processing} />
</form>
