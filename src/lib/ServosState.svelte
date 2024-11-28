<script lang="ts">
    import type { WebSocketIface } from "./websocket_comm";
    import { SvelteMap } from "svelte/reactivity";

    let { wsIface }: { wsIface: WebSocketIface } = $props();

    let servosAngles = $state(new SvelteMap<number, number>());
    wsIface.subscribeServosAngles((sa) => {
        servosAngles.set(sa.id, sa.angle);
    });
</script>

<div>
    <h2>Servos state</h2>

    <table>
        <tbody>
            {#each servosAngles as [servoId, servoAngle]}
                <tr>
                    <td class="servos-c1">{servoId}</td>
                    <td class="servos-c2">{servoAngle}</td>
                    <td class="servos-c3">
                        <input
                            type="range"
                            disabled
                            value={servoAngle}
                            min="-32768"
                            max="32767"
                        />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .servos-c1 {
        width: 40px;
    }
    .servos-c2 {
        width: 100px;
    }
</style>
