<script lang="ts">
    import InterestConfig from "$lib/InterestConfig.svelte";
    import MotorsState from "$lib/MotorsState.svelte";
    import SensorsReadings from "$lib/SensorsReadings.svelte";
    import ServosState from "$lib/ServosState.svelte";
    import webSocketTask from "$lib/websocket_comm";
    import WebSocketConfig from "$lib/WebSocketConfig.svelte";

    let wsIface = webSocketTask();
</script>

<h1>Blimp Vizualizer</h1>

<WebSocketConfig {wsIface}></WebSocketConfig>

<InterestConfig {wsIface}></InterestConfig>

<MotorsState {wsIface}></MotorsState>
<ServosState {wsIface}></ServosState>

<SensorsReadings {wsIface}></SensorsReadings>
