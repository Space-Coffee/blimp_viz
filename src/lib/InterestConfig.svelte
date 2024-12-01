<script lang="ts">
    import type { VizInterest, WebSocketIface } from "./websocket_comm";

    let currInterestMotors = $state<boolean>();
    let currInterestServos = $state<boolean>();
    let currInterestSensors = $state<boolean>();

    let currInterest: VizInterest = $derived({
        motors: currInterestMotors!,
        servos: currInterestServos!,
        sensors: currInterestSensors!,
    });

    let { wsIface }: { wsIface: WebSocketIface } = $props();
</script>

<div>
    <h2>Interest config</h2>

    <input
        type="checkbox"
        id="interest-motors"
        bind:checked={currInterestMotors}
    />
    <label for="interest-motors">Motors</label><br />
    <input
        type="checkbox"
        id="interest-servos"
        bind:checked={currInterestServos}
    />
    <label for="interest-servos">Servos</label><br />
    <input
        type="checkbox"
        id="interest-sensors"
        bind:checked={currInterestSensors}
    />
    <label for="interest-sensors">Sensors</label><br />

    <button
        onclick={() => {
            wsIface.declareInterest(currInterest);
        }}>Update</button
    >
</div>
