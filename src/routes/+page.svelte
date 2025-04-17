<script lang="ts">
import WebSocketConfig from "$lib/WebSocketConfig.svelte";
import ServosState from "$lib/ServosState.svelte";
import MotorsState from "$lib/MotorsState.svelte";
import SensorsReadings from "$lib/SensorsReadings.svelte";
import InterestConfig from "$lib/InterestConfig.svelte";
</script>

<h1>Blimp Visualizer</h1>

<WebSocketConfig></WebSocketConfig>

<InterestConfig></InterestConfig>

<MotorsState></MotorsState>
<ServosState></ServosState>

<SensorsReadings></SensorsReadings>
