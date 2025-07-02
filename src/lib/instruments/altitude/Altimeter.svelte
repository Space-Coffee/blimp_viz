<script lang="ts">
    import {Application, Container, Text} from 'pixi.js';
    import {onMount} from "svelte";
    import {
        getAltitudeMeterText,
        getAltitudeNeedle,
        getStandardAltitudeRing, setAltitudeMeterText
    } from "$lib/instruments/altitude/altimeter";

    const app = new Application();
    let canvas: HTMLCanvasElement;

    const SCALE = Math.PI / 60;
    const needle = new Container();
    let altitude_text: Text | undefined = undefined;

    const WARNING_TINT = [
        "white",
        "yellow",
        "orange",
        "red"
    ]

    onMount(async () =>  {
        await app.init({
            background: "black",
            canvas: canvas,
            autoDensity: true,
            antialias: true,
            resizeTo: canvas.parentElement!
        });
        const size = Math.min(app.canvas.width, app.canvas.height);
        needle.pivot.set(size / 2);
        needle.position.set(size / 2);

        app.stage.addChild(getStandardAltitudeRing(size, SCALE));
        needle.addChild(getAltitudeNeedle(size));
        app.stage.addChild(needle);

        altitude_text = getAltitudeMeterText(size);
        app.stage.addChild(altitude_text!);
        onAltitudeChange();
    })

    let { altitude }: { altitude: number } = $props();

    function onAltitudeChange() {
        needle.rotation = altitude * SCALE * 2;
        const tint = WARNING_TINT[Math.min(Math.floor((Math.abs(needle.rotation)) / Math.PI / 2), WARNING_TINT.length - 1)];
        needle.tint = tint;
        if (altitude_text === undefined) return;
        setAltitudeMeterText(altitude_text, altitude);
        altitude_text.tint = tint;
    }

    $effect(onAltitudeChange);
</script>

<canvas bind:this={canvas}></canvas>
