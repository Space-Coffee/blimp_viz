import { SvelteMap } from "svelte/reactivity";
import { type BlimpState } from "$lib/schema"

export const blimpStateAgg: {
	motors: SvelteMap<number, number>
	servos: SvelteMap<number, number>,
	sensors: SvelteMap<string, number>
	state: BlimpState | null,
} = $state({
	motors: new SvelteMap(),
	servos: new SvelteMap(),
	sensors: new SvelteMap(),
	state: null,
})
// export const motors: SvelteMap<number, number> = new SvelteMap()
// export const servos: SvelteMap<number, number> = new SvelteMap()
// export const sensors: SvelteMap<string, number> = new SvelteMap()
// export const state: BlimpState | null = $state(null)

