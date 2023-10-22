<script lang="ts">
  import "leaflet/dist/leaflet.css";

  import { type Map } from "leaflet";
  import { onMount } from "svelte";
  import { LeafletMap, TileLayer } from "svelte-leafletjs";

  import { reverse, type Place } from "../../../nominatim";
  import type { MapPoint } from "../../../types";
  import PointerMarker from "./PointerMarker.svelte";
  import { normalizeLatLng } from "../../../latlng";

  export let point: Place;
  $: if (point) {
    const latLng = point.latLng;
    const place = Promise.resolve(point);

    map?.panTo(latLng);
    mapPoint = {
      latLng,
      place,
    };
  }

  let leafletMap: LeafletMap;
  let map: Map;
  let mapPoint: MapPoint;

  onMount(() => {
    map = leafletMap.getMap();

    map.addEventListener("click", (ev) => {
      let { lat, lng } = ev.latlng;

      mapPoint = {
        latLng: [lat, lng],
        place: reverse(normalizeLatLng([lat, lng])),
      };
    });
  });
</script>

<div class="map-container">
  <LeafletMap
    bind:this={leafletMap}
    options={{
      center: [35.6779405, 139.7653866] /* Tokyo Station */,
      zoom: 11,
    }}
  >
    <TileLayer
      url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
      options={{
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
      }}
    />
    {#if mapPoint}
      <PointerMarker on:input {mapPoint} />
    {/if}
  </LeafletMap>
</div>

<style>
  .map-container {
    height: 70svh;
  }
</style>
