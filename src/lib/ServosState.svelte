<script lang="ts">
	import { servos } from "$lib/blimp-state.svelte";
</script>

<div>
	<h2>Servos state</h2>

	<table>
		<tbody>
			{#each servos as [servoId, servoAngle]}
				<tr>
					<td class="servos-c1">{servoId}</td>
					<td class="servos-c2">{servoAngle}</td>
					<td class="servos-c3">
						<input
							type="range"
							disabled
							value={servoAngle}
							min="-90.0"
							max="90.0"
							step="0.01"
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
