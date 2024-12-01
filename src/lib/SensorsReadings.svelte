<script lang="ts">
    import type { WebSocketIface } from "./websocket_comm";
    import { SvelteMap } from "svelte/reactivity";

    let { wsIface }: { wsIface: WebSocketIface } = $props();

    let sensorsReadings = $state(new SvelteMap<string, number>());
    wsIface.subscribeSensorsReadings((sr) => {
        sensorsReadings.set(sr.id, sr.data);
        sensorsReadings = sensorsReadings;
        console.log(sr);
    });
</script>

<div>
    <h2>Sensors readings</h2>

    <table>
        <tbody>
            {#each sensorsReadings as [sensorId, sensorData]}
                <tr>
                    <td>{sensorId}</td>
                    <td>{sensorData}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
