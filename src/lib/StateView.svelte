<script lang="ts">
	import { blimpStateAgg } from "$lib/blimp-state.svelte";
	import HeadingIndicator from "$lib/instruments/heading/HeadingIndicator.svelte";
	import Altimeter from "$lib/instruments/altitude/Altimeter.svelte";
	import { Tween } from "svelte/motion";
	import VerticalSpeedIndicator from "$lib/instruments/vertical-speed/VerticalSpeedIndicator.svelte";
	import AirspeedIndicator from "$lib/instruments/airspeed/AirspeedIndicator.svelte";
	import AttitudeIndicator from "$lib/instruments/attitude/AttitudeIndicator.svelte";

	let tween_altitude = new Tween(0.0);
	let tween_heading = new Tween(0.0);
	let tween_vertical_speed = new Tween(0.0);
	let tween_roll = new Tween(0.0);
	let tween_pitch = new Tween(0.0);
	let tween_speed = new Tween(0.0);

	$effect(() => {
		if (blimpStateAgg.state === null) return;
		tween_altitude.set(blimpStateAgg.state.altitude! * 100 + 20);
		tween_heading.set(blimpStateAgg.state.altitude! * 2);
		tween_vertical_speed.set(blimpStateAgg.state.altitude! * 10);
		tween_speed.set(blimpStateAgg.state.altitude! * 15 + 3);
		tween_pitch.set(blimpStateAgg.state.pitch);
		tween_roll.set(blimpStateAgg.state.roll);
	});
</script>

<section>
	<h2>State view</h2>
	{#if blimpStateAgg.state == null}
		State information unavailable
	{:else}
		<p>Flight mode: {blimpStateAgg.state.flight_mode}</p>
		<div id="instruments">
			<div class="panel">
				<h3>Heading Indicator</h3>
				<div class="clock">
					<HeadingIndicator heading={tween_heading.current} />
				</div>
				<p>
					Auto:
					{#if blimpStateAgg.state.desired_heading !== null}
						{blimpStateAgg.state.desired_heading}
					{:else}
						OFF (use Atti or AltiAtti flight mode)
					{/if}
				</p>
			</div>
			<div class="panel">
				<h3>Altimeter</h3>
				<div class="clock">
					<Altimeter altitude={tween_altitude.current} />
				</div>
				<p>
					Auto:
					{#if blimpStateAgg.state.desired_altitude !== null}
						{blimpStateAgg.state.desired_altitude}
					{:else}
						OFF (use AltiAtti flight mode)
					{/if}
				</p>
			</div>
			<div class="panel">
				<h3>Vertical Speed Indicator</h3>
				<div class="clock">
					<VerticalSpeedIndicator
						speed={tween_vertical_speed.current}
					/>
				</div>
			</div>
			<div class="panel">
				<h3>Airspeed Indicator</h3>
				<div class="clock">
					<AirspeedIndicator speed={tween_speed.current} />
				</div>
			</div>
			<div class="panel">
				<h3>Attitude Indicator</h3>
				<div class="clock">
					<AttitudeIndicator
						pitch={tween_pitch.current}
						roll={tween_roll.current}
					/>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	section {
	}

	div.clock {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	div.panel > h3 {
		text-align: center;
	}

	div#instruments {
		background: black;
		display: flex;
		color: white;
		width: 100%;
		height: 50vh;
		overflow: hidden;
	}

	div.panel {
		margin: 0.5vh;
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
</style>
