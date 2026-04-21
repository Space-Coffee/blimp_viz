<script lang="ts">
    import {Application, Container} from 'pixi.js';
    import {onMount} from "svelte";
    import {getCompassNeedle, getStandardCompassRing} from "$lib/instruments/heading/compass";

    const app = new Application();
    let canvas: HTMLCanvasElement;

    const compass: Container = new Container();

    onMount(async () =>  {
        await app.init({
            background: "black",
            canvas: canvas,
            autoDensity: true,
            antialias: true,
            resizeTo: canvas.parentElement!
        });
        const size = Math.min(app.canvas.width, app.canvas.height)
        compass.position.set(size / 2);
        compass.pivot.set(size / 2);
        compass.addChild(getStandardCompassRing(size));
        app.stage.addChild(compass);
        app.stage.addChild(getCompassNeedle(size));
    })

    let { heading }: { heading: number } = $props();

    $effect(() => {
        compass.rotation = -heading;
    })
</script>

<canvas bind:this={canvas}></canvas>
