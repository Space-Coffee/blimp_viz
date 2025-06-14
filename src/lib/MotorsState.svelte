<script lang="ts">
	import { blimpStateAgg } from "$lib/blimp-state.svelte";
</script>

<div>
	<h2>Motors state</h2>

	<table>
		<tbody>
			{#each blimpStateAgg.motors as [motorId, motorSpeed]}
				<tr>
					<td class="motors-c1">{motorId}</td>
					<td class="motors-c2">{motorSpeed}</td>
					<td class="motors-c3">
						<input
							type="range"
							disabled
							value={motorSpeed}
							min="-1.0"
							max="1.0"
							step="0.01"
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.motors-c1 {
		width: 40px;
	}
	.motors-c2 {
		width: 100px;
	}
</style>
