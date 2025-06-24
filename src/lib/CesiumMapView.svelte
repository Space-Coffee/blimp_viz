<script lang="ts">
	import { onMount } from "svelte";
	import * as Cesium from "cesium";
	import "cesium/Build/Cesium/Widgets/widgets.css";

	let cesiumContainer: HTMLElement;

	let viewer: Cesium.Viewer;
	onMount(() => {
		// window.CESIUM_BASE_URL = "./build";
		Object.defineProperty(window, "CESIUM_BASE_URL", {
			value: "build",
		});

		viewer = new Cesium.Viewer(cesiumContainer, {
			terrain: Cesium.Terrain.fromWorldTerrain(),
			// terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
			animation: false,
			timeline: false,
			navigationHelpButton: false,
			geocoder: false,
			baseLayer: new Cesium.ImageryLayer(
				new Cesium.OpenStreetMapImageryProvider({
					url: "https://tile.openstreetmap.org/",
				}),
			),
		});
	});
</script>

<div style="width: 100%">
	<h2>Cesium map view</h2>

	<div id="cesiumContainer" bind:this={cesiumContainer}></div>
</div>

<style>
	#cesiumContainer {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
