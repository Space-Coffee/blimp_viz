import { SvelteMap } from "svelte/reactivity";
import { type BlimpState } from "$lib/schema"

export const motors: SvelteMap<number, number> = new SvelteMap()
export const servos: SvelteMap<number, number> = new SvelteMap()
export const sensors: SvelteMap<string, number> = new SvelteMap()
export const state: BlimpState | null = $state(null)

