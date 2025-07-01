import {Container, Graphics} from "pixi.js";

export function getBackground(size: number): Graphics {
    return new Graphics().rect(0, 0, size, size).fill("blue")
}

export const BLIND_MARGIN: number = 1/20;
const BLIND_COLOR: string = "black";

export function getBlind(size: number): Graphics {
    const blind = new Graphics();
    const middle = size / 2;
    blind.rect(-size * 2, -size * 2, size * 4, size * 4).fill(BLIND_COLOR).circle(middle, middle, middle - size * BLIND_MARGIN).cut();
    return blind;
}

const ROLL_MARK_THICKNESS: number = 1/200;
const ROLL_MARK_COLOR: string = "white"

export function getRollMark(size: number, angle: number): Graphics {
    const roll_mark = new Graphics();
    const middle = size / 2;

    roll_mark.setStrokeStyle({width: size * ROLL_MARK_THICKNESS, color: ROLL_MARK_COLOR});

    const x = Math.cos(angle + Math.PI / 2);
    const y = Math.sin(angle + Math.PI / 2);

    roll_mark.moveTo(
        middle + x * middle, middle - y * middle).
    lineTo(
        middle + x * middle - x * size * BLIND_MARGIN, middle - y * middle + y * size * BLIND_MARGIN
    ).stroke();

    return roll_mark;
}

export function getStandardRollMarks(size: number): Container<Graphics> {
    const container: Container<Graphics> = new Container();
    const angles = [
        0 + ROLL_MARK_THICKNESS * 2,
        Math.PI / 18,
        Math.PI / 9,
        Math.PI / 6 + ROLL_MARK_THICKNESS,
        Math.PI / 6 - ROLL_MARK_THICKNESS,
        Math.PI / 3,
        Math.PI / 2 + ROLL_MARK_THICKNESS,
        Math.PI / 2 - ROLL_MARK_THICKNESS
    ]

    for (const angle of angles) {
        container.addChild(getRollMark(size, angle));
        container.addChild(getRollMark(size, -angle));
    }

    return container;
}

const BULLSEYE_DOT_RADIUS: number = 1/100;
const BULLSEYE_CIRCLE_RADIUS: number = 1/20;
const BULLSEYE_LINE_LENGTH: number = 1/10;
const BULLSEYE_THICKNESS: number = 1/200;
const BULLSEYE_COLOR: string = "white";

export function getBullseye(size: number): Graphics {
    const bullseye = new Graphics();
    const middle = size / 2;

    bullseye.setStrokeStyle({width: size * BULLSEYE_THICKNESS, color: BULLSEYE_COLOR});
    bullseye.setFillStyle({color: BULLSEYE_COLOR});

    bullseye.arc(middle, middle, size * BULLSEYE_CIRCLE_RADIUS, 0, Math.PI).stroke();
    bullseye.circle(middle, middle, size * BULLSEYE_DOT_RADIUS).fill();

    bullseye.moveTo(middle - size * BULLSEYE_LINE_LENGTH, middle).lineTo(middle - size * BULLSEYE_CIRCLE_RADIUS + size * BULLSEYE_THICKNESS / 2, middle).stroke();
    bullseye.moveTo(middle + size * BULLSEYE_LINE_LENGTH, middle).lineTo(middle + size * BULLSEYE_CIRCLE_RADIUS - size * BULLSEYE_THICKNESS / 2, middle).stroke();
    bullseye.moveTo(middle, middle).lineTo(middle, middle + size * BULLSEYE_LINE_LENGTH).stroke()

    return bullseye;
}
