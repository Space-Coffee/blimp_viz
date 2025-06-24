<script lang="ts">
	import { onMount } from "svelte";
	import * as Cesium from "cesium";

	let viewer: Cesium.Viewer;
	onMount(async () => {
		window.CESIUM_BASE_URL = "/";

		viewer = new Cesium.Viewer("cesium-container", {
			terrain: Cesium.Terrain.fromWorldTerrain(),
			timeline: false,
			navigationHelpButton: false,
		});
	});
</script>

<div>
	<h2>Cesium map view</h2>

	<div id="cesium-container"></div>
</div>
