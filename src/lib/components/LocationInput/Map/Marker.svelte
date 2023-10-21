<script lang="ts">
  import leaflet, { type Map } from "leaflet";
  import { getContext, onMount } from "svelte";
  import { Marker, Popup } from "svelte-leafletjs";

  export let latLng: [number, number];
  export let autoOpen = true;

  let popup: Popup;
  let open: () => void;

  const map = getContext<{ getMap: () => Map }>(leaflet).getMap();

  onMount(() => {
    open = () => {
      const p = popup.getPopup();
      p.setLatLng(latLng);
      map.openPopup(p);
    };
  });

  $: if (autoOpen && latLng) open?.();
</script>

<Marker {latLng}>
  <Popup bind:this={popup} options={{ minWidth: 200, maxWidth: 200 }}>
    <slot />
  </Popup>
</Marker>
