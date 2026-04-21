import {Container, Graphics, Text, TextStyle} from "pixi.js";

const ALTITUDE_MARK_THICKNESS: number = 1/200;
const ALTITUDE_MARK_COLOR: string = "white";
const ALTITUDE_TEXT_MARGIN: number = 1/10;
const ALTITUDE_RING_MARGIN: number = 1/20;
const ALTITUDE_MARK_SHRINK: number = 1/40;

export function getAltitudeMark(size: number, angle: number, shrink: boolean): Graphics {
    const altitude_mark = new Graphics();
    const middle = size / 2;

    altitude_mark.setStrokeStyle({width: size * ALTITUDE_MARK_THICKNESS, color: ALTITUDE_MARK_COLOR});

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    const length = ALTITUDE_RING_MARGIN - Number(shrink) * ALTITUDE_MARK_SHRINK;
    altitude_mark.moveTo(
        middle + x * middle - x * size * ALTITUDE_TEXT_MARGIN, middle - y * middle + y * size * ALTITUDE_TEXT_MARGIN).
    lineTo(
        middle + x * middle - x * size * (ALTITUDE_TEXT_MARGIN + length), middle - y * middle + y * size * (ALTITUDE_TEXT_MARGIN + length)
    ).stroke();

    return altitude_mark;
}

const ALTITUDE_FONT_FAMILY: string = "Arial";
const ALTITUDE_FONT_SIZE: number = 1/20;
const ALTITUDE_TEXT_COLOR: string = "white";

export function getAltitudeText(size: number, angle: number, altitude: number): Text {
    const style = new TextStyle({
        fontFamily: ALTITUDE_FONT_FAMILY,
        fontSize: size * ALTITUDE_FONT_SIZE,
        fill: {color: ALTITUDE_TEXT_COLOR},
    });
    const label = altitude.toFixed().toString();

    const altitude_text = new Text({text: label, style: style});
    const middle = size / 2;

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    altitude_text.pivot.set(altitude_text.width / 2, altitude_text.height / 2);
    altitude_text.position.set(middle + x * middle - x * size * ALTITUDE_TEXT_MARGIN / 2, middle - y * middle + y * size * ALTITUDE_TEXT_MARGIN / 2);

    return altitude_text;
}

const ALTITUDE_RING_DENSITY: number = 60;
const ALTITUDE_RING_TEXT_DENSITY: number = 1/5;

export function getStandardAltitudeRing(size: number, scale: number): Container<Graphics | Text> {
    const ring: Container<Graphics | Text> = new Container();
    for (let i = 0; i < ALTITUDE_RING_DENSITY; i++) {
        const angle = i * Math.PI  * 2 / ALTITUDE_RING_DENSITY;
        const speed = angle / scale / 2;
        const sub: boolean = Boolean(i % (1/ALTITUDE_RING_TEXT_DENSITY));

        ring.addChild(getAltitudeMark(size, -angle, sub));
        if (!sub) {
            ring.addChild(getAltitudeText(size, -angle, speed));
        }
    }
    return ring;
}

const NEEDLE_WIDTH: number = 1/30;
const NEEDLE_HEIGHT: number = 1/3;
const NEEDLE_COLOR: string = "white";

export function getAltitudeNeedle(size: number): Graphics {
    const needle = new Graphics();
    const middle = size / 2;

    needle.poly([
        {x: middle, y: middle - size * NEEDLE_HEIGHT},
        {x: middle - size * NEEDLE_WIDTH / 2, y: middle},
        {x: middle + size * NEEDLE_WIDTH / 2, y: middle}
    ]).fill(NEEDLE_COLOR);

    return needle;
}


export function setAltitudeMeterText(text: Text, altitude: number) {
    text.text = `${altitude.toFixed(1)} m`;
    text.pivot.set(text.width / 2, text.height / 2);
}

export function getAltitudeMeterText(size: number): Text {
    const style = new TextStyle({
        fontFamily: ALTITUDE_FONT_FAMILY,
        fontSize: size * ALTITUDE_FONT_SIZE,
        fill: {color: ALTITUDE_TEXT_COLOR},
    });
    const middle = size / 2;
    const text = new Text({text: "", style: style});
    setAltitudeMeterText(text, 0);
    text.position.set(middle, middle + style.fontSize * 3);
    return text;
}