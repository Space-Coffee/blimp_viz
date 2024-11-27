<script lang="ts">
    import type { WebSocketIface } from "./websocket_comm";
    import { SvelteMap } from "svelte/reactivity";

    let { wsIface }: { wsIface: WebSocketIface } = $props();

    let motorsSpeeds = $state(new SvelteMap<number, number>());
    wsIface.subscribeMotorsSpeeds((ms) => {
        motorsSpeeds.set(ms.id, ms.speed);
        motorsSpeeds = motorsSpeeds;
        console.log(motorsSpeeds);
    });
</script>

<div>
    <h2>Motors state</h2>

    <table>
        <tbody>
            {#each motorsSpeeds as [motorId, motorSpeed]}
                <tr><td>{motorId}</td> <td>{motorSpeed}</td></tr>
            {/each}
        </tbody>
    </table>
</div>
