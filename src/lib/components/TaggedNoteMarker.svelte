<script lang="ts">
  import { MapMarker } from "./LocationInput";

  export let note: unknown;
</script>

<MapMarker latLng={[0, 0]}>
  {note}
  <button class="button">Update</button>
</MapMarker>
