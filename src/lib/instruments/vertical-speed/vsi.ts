import {Container, Graphics, Text, TextStyle} from "pixi.js";

const VSI_MARK_THICKNESS: number = 1/200;
const VSI_MARK_COLOR: string = "white";
const VSI_TEXT_MARGIN: number = 1/10;
const VSI_RING_MARGIN: number = 1/20;
const VSI_MARK_SHRINK: number = 1/40;

export function getVsiMark(size: number, angle: number, shrink: boolean): Graphics {
    const vsi_mark = new Graphics();
    const middle = size / 2;

    vsi_mark.setStrokeStyle({width: size * VSI_MARK_THICKNESS, color: VSI_MARK_COLOR});

    const x = Math.cos(angle + Math.PI);
    const y = Math.sin(angle + Math.PI);

    const length = VSI_RING_MARGIN - Number(shrink) * VSI_MARK_SHRINK;
    vsi_mark.moveTo(
        middle + x * middle - x * size * VSI_TEXT_MARGIN, middle - y * middle + y * size * VSI_TEXT_MARGIN).
    lineTo(
        middle + x * middle - x * size * (VSI_TEXT_MARGIN + length), middle - y * middle + y * size * (VSI_TEXT_MARGIN + length)
    ).stroke();

    return vsi_mark;
}

const VSI_FONT_FAMILY: string = "Arial";
const VSI_FONT_SIZE: number = 1/20;
const VSI_TEXT_COLOR: string = "white";

export function getVsiText(size: number, angle: number, speed: number): Text {
    const style = new TextStyle({
        fontFamily: VSI_FONT_FAMILY,
        fontSize: size * VSI_FONT_SIZE,
        fill: {color: VSI_TEXT_COLOR},
    });
    const label = speed.toFixed().toString();

    const vsi_text = new Text({text: label, style: style});
    const middle = size / 2;

    const x = Math.cos(angle + Math.PI);
    const y = Math.sin(angle + Math.PI);

    vsi_text.pivot.set(vsi_text.width / 2, vsi_text.height / 2);
    vsi_text.position.set(middle + x * middle - x * size * VSI_TEXT_MARGIN / 2, middle - y * middle + y * size * VSI_TEXT_MARGIN / 2);

    return vsi_text;
}

const VSI_RING_DENSITY: number = 20;
const VIS_RING_TEXT_DENSITY: number = 1/4;

export function getStandardVsiRing(size: number, scale: number): Container<Graphics | Text> {
    const ring: Container<Graphics | Text> = new Container();
    for (let i = 0; i <= VSI_RING_DENSITY; i++) {
        const angle = i * Math.PI / VSI_RING_DENSITY;
        const speed = angle / scale;
        const sub: boolean = Boolean(i % (1/VIS_RING_TEXT_DENSITY));

        ring.addChild(getVsiMark(size, angle, sub));
        if (!sub) {
            ring.addChild(getVsiText(size, angle, speed));
        }
        if (angle % Math.PI) {
            ring.addChild(getVsiMark(size, -angle, sub));
            if (!sub) {
                ring.addChild(getVsiText(size, -angle, speed));
            }
        }
    }
    return ring;
}

const NEEDLE_WIDTH: number = 1/30;
const NEEDLE_HEIGHT: number = 1/3;
const NEEDLE_COLOR: string = "white";

export function getVsiNeedle(size: number): Graphics {
    const needle = new Graphics();
    const middle = size / 2;

    needle.poly([
        {x: middle - size * NEEDLE_HEIGHT, y: middle},
        {x: middle, y: middle + size * NEEDLE_WIDTH / 2},
        {x: middle, y: middle - size * NEEDLE_WIDTH / 2}
    ]).fill(NEEDLE_COLOR);
    return needle;
}

export function setSpeedText(text: Text, speed: number) {
    let sign = "=";
    if (speed < -0.005) {
        sign = "-"
    }
    if (speed > 0.005) {
        sign = "+"
    }
    text.text = `${sign} ${Math.abs(speed).toFixed(2)} \u33A7`;
    text.pivot.set(text.width / 2, text.height / 2);

}

export function getVerticalSpeedText(size: number): Text {
    const style = new TextStyle({
        fontFamily: VSI_FONT_FAMILY,
        fontSize: size * VSI_FONT_SIZE,
        fill: {color: VSI_TEXT_COLOR},
    });
    const middle = size / 2;
    const text = new Text({text: "", style: style});
    setSpeedText(text, 0);
    text.position.set(middle, middle + style.fontSize * 3);
    return text;
}