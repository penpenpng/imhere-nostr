<script lang="ts">
  import LocationInput from "./lib/components/LocationInput/LocationInput.svelte";
</script>

<LocationInput on:input={(ev) => console.log(ev.detail.mapPoint)} />
