<script lang="ts">
    import {Application, Container} from 'pixi.js';
    import {onMount} from "svelte";
    import {getBackground, getBlind, getBullseye, getStandardRollMarks} from "$lib/instruments/attitude/frame";
    import {getGround, getRollIndicator, getStandardPitchMarks} from "$lib/instruments/attitude/background";

    const FOV = Math.PI / 2;

    const app = new Application();
    let canvas: HTMLCanvasElement;
    let pitch_dependant: Container<any> = new Container();
    let roll_dependant: Container<any> = new Container();

    onMount(async () =>  {
        await app.init({
            background: "black",
            canvas: canvas,
            autoDensity: true,
            antialias: true,
            resizeTo: canvas.parentElement!
        });
        const size = Math.min(app.canvas.width, app.canvas.height);
        app.stage.addChild(getBackground(size));

        pitch_dependant.addChild(getGround(size));
        pitch_dependant.addChild(getStandardPitchMarks(size, FOV));

        roll_dependant.pivot.set(size / 2);
        roll_dependant.position.set(size / 2);
        roll_dependant.addChild(pitch_dependant);
        roll_dependant.addChild(getRollIndicator(size));

        app.stage.addChild(roll_dependant);

        app.stage.addChild(getBullseye(size));
        app.stage.addChild(getBlind(size));
        app.stage.addChild(getStandardRollMarks(size));
    })

    let { pitch, roll }: { pitch: number, roll: number } = $props();

    $effect(() => {
        pitch_dependant.position.y = pitch / FOV * Math.min(canvas.height, canvas.width);
    })

    $effect(() => {
        roll_dependant.rotation = roll;
    })
</script>

<canvas bind:this={canvas}></canvas>