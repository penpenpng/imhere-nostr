<script lang="ts">
  import LocationInput from "./lib/components/LocationInput/LocationInput.svelte";
  import Modal from "./lib/components/Modal.svelte";

  let modalShown = false;
</script>

{#if modalShown}
  <Modal
    on:close={() => {
      modalShown = false;
    }}
  >
    <div slot="header">title</div>
    <div slot="content">hello</div>
  </Modal>
{/if}
<LocationInput
  on:input={(ev) => {
    console.log(ev.detail.mapPoint);
    modalShown = true;
  }}
/>
