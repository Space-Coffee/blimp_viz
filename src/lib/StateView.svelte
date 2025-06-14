<script lang="ts">
	import { state } from "$lib/blimp-state.svelte";
</script>

<div>
	<table>
		<tbody>
			{#each ["flight_mode", "altitude", "heading"] as field}
				<tr>
					<td>
						{field}
					</td>
					<td>
						{state == null ? "-" : ["field"]}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
