<script lang="ts">
  import type { Place } from "../nominatim";
  import { postContentWithLocation } from "../nostr";
  import { displayLatLng } from "../latlng";
  import Modal from "./Modal.svelte";

  export let place: Place;

  let value = "";
  let posted = false;
  let errorMessage = "";

  function post() {
    if (posted) {
      return;
    }
    if (!value) {
      errorMessage = "Message is required.";
      return;
    }

    posted = true;

    postContentWithLocation({
      content: value,
      place,
    });
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

    <button
      class="button is-info is-pulled-right px-5"
      disabled={posted}
      on:click={post}>{posted ? "Done!" : "Post"}</button
    >
    <div class="is-clearfix" />
    {#if posted}
      <div class="notification is-success is-light p-2 mt-2 is-size-7">
        Your location has been shared on Nostr! Check it out on <a
          href="https://mapnos.vercel.app/"
          target="_blank">mapnos</a
        >.
      </div>
    {/if}
  </div>
</Modal>
