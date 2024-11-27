<script lang="ts">
    import InterestConfig from "$lib/InterestConfig.svelte";
    import MotorsState from "$lib/MotorsState.svelte";
    import webSocketTask from "$lib/websocket_comm";
    import WebSocketConfig from "$lib/WebSocketConfig.svelte";

    let wsIface = webSocketTask();
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>

<WebSocketConfig {wsIface}></WebSocketConfig>

<InterestConfig {wsIface}></InterestConfig>

<MotorsState></MotorsState>
