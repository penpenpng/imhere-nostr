<script lang="ts">
  import LocationInput from "./lib/components/LocationInput/LocationInput.svelte";
  import PostNodeModal from "./lib/components/PostNodeModal.svelte";

  let modalShown = false;
</script>

<PostNodeModal bind:show={modalShown} />
<LocationInput
  on:input={(ev) => {
    console.log(ev.detail.mapPoint);
    modalShown = true;
  }}
/>
