import {Container, Graphics, Text, TextStyle} from "pixi.js";

const SPEED_MARK_THICKNESS: number = 1/200;
const SPEED_MARK_COLOR: string = "white";
const SPEED_TEXT_MARGIN: number = 1/10;
const SPEED_RING_MARGIN: number = 1/20;
const SPEED_MARK_SHRINK: number = 1/40;

export function getSpeedMark(size: number, angle: number, shrink: boolean): Graphics {
    const speed_mark = new Graphics();
    const middle = size / 2;

    speed_mark.setStrokeStyle({width: size * SPEED_MARK_THICKNESS, color: SPEED_MARK_COLOR});

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    const length = SPEED_RING_MARGIN - Number(shrink) * SPEED_MARK_SHRINK;
    speed_mark.moveTo(
        middle + x * middle - x * size * SPEED_TEXT_MARGIN, middle - y * middle + y * size * SPEED_TEXT_MARGIN).
    lineTo(
        middle + x * middle - x * size * (SPEED_TEXT_MARGIN + length), middle - y * middle + y * size * (SPEED_TEXT_MARGIN + length)
    ).stroke();

    return speed_mark;
}

const SPEED_FONT_FAMILY: string = "Arial";
const SPEED_FONT_SIZE: number = 1/20;
const SPEED_TEXT_COLOR: string = "white";

export function getSpeedText(size: number, angle: number, speed: number): Text {
    const style = new TextStyle({
        fontFamily: SPEED_FONT_FAMILY,
        fontSize: size * SPEED_FONT_SIZE,
        fill: {color: SPEED_TEXT_COLOR},
    });
    const label = speed.toFixed().toString();

    const speed_text = new Text({text: label, style: style});
    const middle = size / 2;

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    speed_text.pivot.set(speed_text.width / 2, speed_text.height / 2);
    speed_text.position.set(middle + x * middle - x * size * SPEED_TEXT_MARGIN / 2, middle - y * middle + y * size * SPEED_TEXT_MARGIN / 2);

    return speed_text;
}

const SPEED_RING_DENSITY: number = 50;
const SPEED_RING_TEXT_DENSITY: number = 1/5;

export function getStandardSpeedRing(size: number, scale: number): Container<Graphics | Text> {
    const ring: Container<Graphics | Text> = new Container();
    for (let i = 0; i < SPEED_RING_DENSITY; i++) {
        const angle = i * Math.PI  * 2 / SPEED_RING_DENSITY;
        const speed = angle / scale / 2;
        const sub: boolean = Boolean(i % (1/SPEED_RING_TEXT_DENSITY));

        ring.addChild(getSpeedMark(size, -angle, sub));
        if (!sub) {
            ring.addChild(getSpeedText(size, -angle, speed));
        }
    }
    return ring;
}

const NEEDLE_WIDTH: number = 1/30;
const NEEDLE_HEIGHT: number = 1/3;
const NEEDLE_COLOR: string = "white";

export function getSpeedNeedle(size: number): Graphics {
    const needle = new Graphics();
    const middle = size / 2;

    needle.poly([
        {x: middle, y: middle - size * NEEDLE_HEIGHT},
        {x: middle - size * NEEDLE_WIDTH / 2, y: middle},
        {x: middle + size * NEEDLE_WIDTH / 2, y: middle}
    ]).fill(NEEDLE_COLOR);

    return needle;
}


export function setSpeedMeterText(text: Text, speed: number) {
    text.text = `${Math.abs(speed).toFixed(1)} \u33A7`;
    text.pivot.set(text.width / 2, text.height / 2);
}

export function getSpeedMeterText(size: number): Text {
    const style = new TextStyle({
        fontFamily: SPEED_FONT_FAMILY,
        fontSize: size * SPEED_FONT_SIZE,
        fill: {color: SPEED_TEXT_COLOR},
    });
    const middle = size / 2;
    const text = new Text({text: "", style: style});
    setSpeedMeterText(text, 0);
    text.position.set(middle, middle + style.fontSize * 3);
    return text;
}