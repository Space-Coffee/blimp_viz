import {Container, Graphics, Text, TextStyle} from "pixi.js";

const COMPASS_MARK_THICKNESS: number = 1/200;
const COMPASS_MARK_COLOR: string = "white";
const COMPASS_TEXT_MARGIN: number = 1/10;
const COMPASS_RING_MARGIN: number = 1/20;
const COMPASS_MARK_SHRINK: number = 1/40;

export function getCompassMark(size: number, angle: number, shrink: boolean): Graphics {
    const compass_mark = new Graphics();
    const middle = size / 2;

    compass_mark.setStrokeStyle({width: size * COMPASS_MARK_THICKNESS, color: COMPASS_MARK_COLOR});

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    const length = COMPASS_RING_MARGIN - Number(shrink) * COMPASS_MARK_SHRINK;
    compass_mark.moveTo(
        middle + x * middle - x * size * COMPASS_TEXT_MARGIN, middle - y * middle + y * size * COMPASS_TEXT_MARGIN).
    lineTo(
        middle + x * middle - x * size * (COMPASS_TEXT_MARGIN + length), middle - y * middle + y * size * (COMPASS_TEXT_MARGIN + length)
    ).stroke();

    return compass_mark;
}

const COMPASS_FONT_FAMILY: string = "Arial";
const COMPASS_FONT_SIZE: number = 1/20;
const COMPASS_TEXT_COLOR: string = "white";

export function getCompassText(size: number, angle: number): Text {
    const style = new TextStyle({
        fontFamily: COMPASS_FONT_FAMILY,
        fontSize: size * COMPASS_FONT_SIZE,
        fill: {color: COMPASS_TEXT_COLOR},
    });
    let label = ((angle) / Math.PI * 180 / 10).toFixed().toString();
    if (angle == 0) {
        label = "N";
    } else if (angle == Math.PI / 2) {
        label = "E";
    } else if (angle == Math.PI) {
        label = "S";
    } else if (angle == Math.PI * 1.5) {
        label = "W";
    }

    const compass_text = new Text({text: label, style: style});
    const middle = size / 2;

    const x = Math.cos(Math.PI / 2 - angle);
    const y = Math.sin(Math.PI / 2 - angle);

    compass_text.pivot.set(compass_text.width / 2, compass_text.height / 2);
    compass_text.position.set(middle + x * middle - x * size * COMPASS_TEXT_MARGIN / 2, middle - y * middle + y * size * COMPASS_TEXT_MARGIN / 2);
    compass_text.rotation = angle;

    return compass_text;
}

export function getStandardCompassRing(size: number): Container<Graphics | Text> {
    const ring: Container<Graphics | Text> = new Container();
    for (let i = 0; i < 72; i++) {
        ring.addChild(getCompassMark(size, i * Math.PI / 36, Boolean(i % 2)));
        if (i % 6) continue;
        ring.addChild(getCompassText(size, i * Math.PI / 36));
    }
    return ring;
}

const NEEDLE_WIDTH: number = 1/20;
const NEEDLE_HEIGHT: number = 1/10;
const NEEDLE_COLOR: string = "white";
const NEEDLE_ICON_WIDTH: number = 1/10;
const NEEDLE_ICON_HEIGHT: number = 1/5;
const NEEDLE_CROSS_SIZE: number = 1/2;
const NEEDLE_CROSS_WIDTH: number = 1/150;

export function getCompassNeedle(size: number): Graphics {
    const needle = new Graphics();
    const middle = size / 2;

    needle.poly([
        {x: middle, y: size * (COMPASS_TEXT_MARGIN + COMPASS_RING_MARGIN)},
        {x: middle - size * NEEDLE_WIDTH / 2, y: size * (COMPASS_TEXT_MARGIN + COMPASS_RING_MARGIN) + size * NEEDLE_HEIGHT},
        {x: middle + size * NEEDLE_WIDTH / 2, y: size * (COMPASS_TEXT_MARGIN + COMPASS_RING_MARGIN) + size * NEEDLE_HEIGHT}
    ]).fill(NEEDLE_COLOR);
    needle.ellipse(middle, middle, size * NEEDLE_ICON_WIDTH, size * NEEDLE_ICON_HEIGHT).fill(NEEDLE_COLOR);
    needle.setStrokeStyle({color: NEEDLE_COLOR, width: size * NEEDLE_CROSS_WIDTH});
    needle.moveTo(middle - size * NEEDLE_CROSS_SIZE / 2, middle).lineTo(middle + size * NEEDLE_CROSS_SIZE / 2, middle).stroke();
    needle.moveTo(middle, middle - size * NEEDLE_CROSS_SIZE / 2).lineTo(middle, middle + size * NEEDLE_CROSS_SIZE / 2).stroke();
    return needle;
}