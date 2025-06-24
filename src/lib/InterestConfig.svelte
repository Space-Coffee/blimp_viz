<script lang="ts">
	import { webSocketManager } from "$lib/websocket.svelte";
	import { blimpStateAgg } from "$lib/blimp-state.svelte";

	let interestMotors: boolean = $state(false);
	let interestServos: boolean = $state(false);
	let interestSensors: boolean = $state(false);
	let interestState: boolean = $state(false);

	$effect(() => {
		if (!webSocketManager.connected) return;
		webSocketManager.sendMessage({
			DeclareInterest: {
				motors: interestMotors,
				servos: interestServos,
				sensors: interestSensors,
				state: interestState,
			},
		});

		if (!interestMotors) {
			blimpStateAgg.motors.clear();
		}
		if (!interestServos) {
			blimpStateAgg.servos.clear();
		}
		if (!interestSensors) {
			blimpStateAgg.sensors.clear();
		}
		if (!interestState) {
			blimpStateAgg.state = null;
		}
	});
</script>

<div>
	<h2>Interest config</h2>

	<input type="checkbox" id="interest-motors" bind:checked={interestMotors} />
	<label for="interest-motors">Motors</label><br />
	<input type="checkbox" id="interest-servos" bind:checked={interestServos} />
	<label for="interest-servos">Servos</label><br />
	<input
		type="checkbox"
		id="interest-sensors"
		bind:checked={interestSensors}
	/>
	<label for="interest-sensors">Sensors</label><br />
	<input type="checkbox" id="interest-state" bind:checked={interestState} />
	<label for="interest-state">State</label><br />
</div>
