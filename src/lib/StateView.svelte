<script lang="ts">
	import { blimpStateAgg } from "$lib/blimp-state.svelte";
</script>

<div>
	<h2>State view</h2>

	<table>
		<tbody>
			<tr>
				<td> Flight mode </td>
				<td>
					{blimpStateAgg.state == null
						? "-"
						: blimpStateAgg.state.flight_mode}
				</td>
			</tr>
			<tr>
				<td> Altitude </td>
				<td>
					{blimpStateAgg.state == null
						? "-"
						: blimpStateAgg.state.altitude}
				</td>
			</tr>
			<tr>
				<td> Desired altitude </td>
				<td>
					{blimpStateAgg.state == null
						? "-"
						: blimpStateAgg.state.desired_altitude}
				</td>
			</tr>
			<tr>
				<td> Heading </td>
				<td>
					{blimpStateAgg.state == null
						? "-"
						: blimpStateAgg.state.heading}
				</td>
			</tr>
			<tr>
				<td> Desired heading </td>
				<td>
					{blimpStateAgg.state == null
						? "-"
						: blimpStateAgg.state.desired_heading}
				</td>
			</tr>
		</tbody>
	</table>
</div>
