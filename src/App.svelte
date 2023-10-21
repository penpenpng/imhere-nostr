<script lang="ts">
  import LocationInput from "./lib/components/LocationInput/LocationInput.svelte";
  import Modal from "./lib/components/Modal.svelte";

  let modalShown = false;
</script>

<Modal bind:show={modalShown}>
  <div slot="header">title</div>
  <div slot="content">hello</div>
</Modal>
<LocationInput
  on:input={(ev) => {
    console.log(ev.detail.mapPoint);
    modalShown = true;
  }}
/>
