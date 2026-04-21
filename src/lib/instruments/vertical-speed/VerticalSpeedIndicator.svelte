<script lang="ts">
    import {Application, Container, Text} from 'pixi.js';
    import {onMount} from "svelte";
    import {
        getStandardVsiRing,
        getVerticalSpeedText,
        getVsiNeedle,
        setSpeedText
    } from "$lib/instruments/vertical-speed/vsi";

    const app = new Application();
    let canvas: HTMLCanvasElement;

    const SCALE = Math.PI / 5;
    const needle = new Container();
    let speed_text: Text | undefined = undefined;

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
        app.stage.addChild(getStandardVsiRing(size, SCALE));
        needle.addChild(getVsiNeedle(size));
        app.stage.addChild(needle);

        speed_text = getVerticalSpeedText(size);
        app.stage.addChild(speed_text!);
        onSpeedChange();
    })

    let { speed }: { speed: number } = $props();

    function onSpeedChange() {
        needle.rotation = speed * SCALE;
        const tint = WARNING_TINT[Math.min(Math.floor((Math.abs(needle.rotation) + Math.PI) / Math.PI / 2), WARNING_TINT.length - 1)];
        needle.tint = tint;
        if (speed_text === undefined) return;
        setSpeedText(speed_text, speed);
        speed_text.tint = tint;
    }

    $effect(onSpeedChange)
</script>

<canvas bind:this={canvas}></canvas>
