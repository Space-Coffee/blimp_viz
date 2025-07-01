<script lang="ts">
	import WebSocketConfig from "$lib/WebSocketConfig.svelte";
	import ServosState from "$lib/ServosState.svelte";
	import MotorsState from "$lib/MotorsState.svelte";
	import SensorsReadings from "$lib/SensorsReadings.svelte";
	import InterestConfig from "$lib/InterestConfig.svelte";
	import StateView from "$lib/StateView.svelte";
	import CesiumMapView from "$lib/CesiumMapView.svelte";
    import HeadingIndicator from "$lib/instruments/heading/HeadingIndicator.svelte";
    import AttitudeIndicator from "$lib/instruments/attitude/AttitudeIndicator.svelte";
</script>

<h1>Blimp Visualizer</h1>

<WebSocketConfig></WebSocketConfig>

<InterestConfig></InterestConfig>

<MotorsState></MotorsState>
<ServosState></ServosState>
<SensorsReadings></SensorsReadings>
<StateView></StateView>

<AttitudeIndicator pitch={0.0} roll={0.0}></AttitudeIndicator>
<HeadingIndicator heading={0.0}></HeadingIndicator>


<CesiumMapView></CesiumMapView>
