import {SvelteMap} from "svelte/reactivity";

export const motors: SvelteMap<number, number> = new SvelteMap()
export const servos: SvelteMap<number, number> = new SvelteMap()
export const sensors: SvelteMap<string, number> = new SvelteMap()

