<script lang="ts">
import {sensors} from "$lib/blimp-state.svelte";
</script>

<div>
    <h2>Sensors readings</h2>

    <table>
        <tbody>
            {#each sensors as [sensorId, sensorData]}
                <tr>
                    <td>{sensorId}</td>
                    <td>{sensorData}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
