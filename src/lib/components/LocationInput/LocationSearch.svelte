<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Place, search } from "../../nominatim";

  let query = "";
  let processing = false;
  let errorMessage = "";
  let candidates: Place[];
  let place: Place;

  $: if (place) dispatch("input", { place });

  const dispatch = createEventDispatcher<{
    input: { place: Place };
  }>();

  async function performSearch() {
    processing = true;
    errorMessage = "";

    try {
      const result = await search(query);
      if (result.length > 0) {
        candidates = result;
        place = candidates[0];
      } else {
        errorMessage = "Not Found.";
      }
    } catch {
      errorMessage = "Communication Error. Please retry later.";
    }

    processing = false;
  }
</script>

<form class="field" on:submit|preventDefault={performSearch}>
  <div class="control">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          type="text"
          placeholder="Where are you?"
          class="input"
          class:is-danger={errorMessage}
          disabled={processing}
          bind:value={query}
        />
      </div>
      <div class="control">
        <button
          class="button is-outlined is-primary"
          class:is-loading={processing}
          type="submit"
          disabled={processing}>Search</button
        >
      </div>
    </div>
  </div>
  {#if errorMessage}
    <div class="help has-text-danger">{errorMessage}</div>
  {/if}
</form>

{#if candidates}
  <div class="field negative-margin-top">
    <div class="control">
      <div class="select is-fullwidth">
        <select class="is-fullwidth" bind:value={place}>
          {#each candidates as p (p.place_id)}
            <option value={p}>
              {p.name} -
              {p.display_name}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{/if}

<style>
  .negative-margin-top {
    margin-block: -0.3rem;
  }
</style>
