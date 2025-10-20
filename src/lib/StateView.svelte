<script lang="ts">
	import { blimpStateAgg } from "$lib/blimp-state.svelte";
	import HeadingIndicator from "$lib/instruments/heading/HeadingIndicator.svelte";
	import Altimeter from "$lib/instruments/altitude/Altimeter.svelte";
	import { Tween } from "svelte/motion";
	import VerticalSpeedIndicator from "$lib/instruments/vertical-speed/VerticalSpeedIndicator.svelte";
	import AirspeedIndicator from "$lib/instruments/airspeed/AirspeedIndicator.svelte";
	import AttitudeIndicator from "$lib/instruments/attitude/AttitudeIndicator.svelte";

	let base_altitude: null | number = $state(null);
	let tween_altitude = new Tween(0.0);
	let tween_heading = new Tween(0.0);
	let tween_vertical_speed = new Tween(0.0, {duration: 3000});
	let tween_roll = new Tween(0.0);
	let tween_pitch = new Tween(0.0);
	let tween_speed = new Tween(0.0);
	let last_state_update: number = Date.now();
	let last_altitude: number = 0.0;

	$effect(() => {
		if (blimpStateAgg.state === null) return;
		if (base_altitude === null) base_altitude = blimpStateAgg.state.altitude;
		let now = Date.now();
		if (now - last_state_update < 50) { return; }

		tween_vertical_speed.set((blimpStateAgg.state.altitude - last_altitude)/(now - last_state_update)*1000);
		if (Math.abs(tween_heading.current - blimpStateAgg.state.heading) > Math.PI) {
			if (tween_heading.current > blimpStateAgg.state.heading) {
				tween_heading.set(tween_heading.current - Math.PI * 2, {delay: 0, duration: 0})
			} else if (tween_heading.current < blimpStateAgg.state.heading) {
				tween_heading.set(tween_heading.current + Math.PI * 2, {delay: 0, duration: 0})
			}
		}
		tween_heading.set(blimpStateAgg.state.heading);
		tween_altitude.set(blimpStateAgg.state.altitude - base_altitude);
		tween_pitch.set(blimpStateAgg.state.pitch);
		tween_roll.set(blimpStateAgg.state.roll);
		last_state_update = now;
		last_altitude = blimpStateAgg.state.altitude;
	});
</script>

<section>
	<h2>State view</h2>
	{#if blimpStateAgg.state == null}
		State information unavailable
	{:else}
		<h2 id="flight-mode">Flight mode: {blimpStateAgg.state.flight_mode}</h2>
		<div id="instruments">
			<div class="panel">
				<h3>Heading Indicator</h3>
				<div class="clock">
					<HeadingIndicator heading={tween_heading.current} />
				</div>
				<p class="auto-value">
					Auto:
					{#if blimpStateAgg.state.desired_heading !== null}
						{(Math.round(blimpStateAgg.state.desired_heading / (Math.PI * 2) * 360) % 360 + 360) % 360}&deg;
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
				<p class="auto-value">
					Auto:
					{#if blimpStateAgg.state.desired_altitude !== null}
						{Math.round(blimpStateAgg.state.desired_altitude)}m
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
<!--			<div class="panel">-->
<!--				<h3>Airspeed Indicator</h3>-->
<!--				<div class="clock">-->
<!--					<AirspeedIndicator speed={tween_speed.current} />-->
<!--				</div>-->
<!--				<p>WIP</p>-->
<!--			</div>-->
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
		height: 60vh;
		overflow: hidden;
	}

	div.panel {
		margin: 0.5vh;
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	p.auto-value {
		text-align: center;
	}

	h2#flight-mode {
		text-align: center;
		font-size: 36px;
	}
</style>
