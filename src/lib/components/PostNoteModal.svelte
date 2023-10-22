<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Place } from "../nominatim";
  import { postContentWithLocation } from "../nostr";
  import { displayLatLng } from "../text";
  import Modal from "./Modal.svelte";

  export let place: Place;

  let value = "";
  let processing = false;
  let errorMessage = "";

  const dispatch = createEventDispatcher<{ close: void }>();

  function post() {
    if (processing) {
      return;
    }
    if (!value) {
      errorMessage = "Message is required.";
      return;
    }

    processing = true;

    postContentWithLocation({
      content: value,
      place,
    });

    processing = false;
    dispatch("close");
  }

  function onKeydown(ev: KeyboardEvent) {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
      post();
    }
  }
</script>

<Modal on:close>
  <div slot="content">
    <div class="mb-1">
      I'm at
      {#if place.name}
        <b>{place.name}</b>
      {:else}
        <b class="has-text-grey-light">{displayLatLng(place.latLng)}</b>
      {/if}
    </div>
    <div class="field">
      <div class="control">
        <textarea
          bind:value
          class="textarea"
          class:is-danger={errorMessage}
          placeholder="What's happening there?"
          on:keydown={onKeydown}
        />
      </div>
      {#if errorMessage}
        <div class="help has-text-danger">{errorMessage}</div>
      {/if}
    </div>

    <button class="button is-info is-pulled-right" on:click={post}>Post</button>
    <div class="is-clearfix" />
  </div>
</Modal>
