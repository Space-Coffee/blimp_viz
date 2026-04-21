import {Container, Graphics, Text, TextStyle} from "pixi.js";
import {BLIND_MARGIN} from "$lib/instruments/attitude/frame";

const GROUND_COLOR: string = "green";

export function getGround(size: number): Graphics {
    const ground = new Graphics();

    ground.rect(size / 2, size / 2, size * 2, size).fill(GROUND_COLOR);
    ground.pivot.set(size, 0);

    return ground
}

const PITCH_MARK_THICKNESS: number = 1/200;
const PITCH_MARK_COLOR: string = "white";
const PITCH_MARK_FONT_SIZE: number = 1/40;
const PITCH_MARK_FONT_FAMILY: string = "Arial";
const PITCH_MARK_TEXT_MARGIN: number = 1/2;

export function getPitchMark(size: number, fov: number, angle: number): Container<Graphics | Text> {
    const pitch_mark: Container<Graphics | Text> = new Container();
    const middle = size / 2;
    const style = new TextStyle({
        fontFamily: PITCH_MARK_FONT_FAMILY,
        fontSize: size * PITCH_MARK_FONT_SIZE,
        fill: {color: PITCH_MARK_COLOR},
    });

    const portion = fov / angle;

    const line = new Graphics();
    line.setStrokeStyle({width: size * PITCH_MARK_THICKNESS, color: PITCH_MARK_COLOR});
    line.moveTo(middle - middle / portion, middle - size / portion).lineTo(middle + middle / portion, middle - size / portion).stroke();

    pitch_mark.addChild(line);

    for (const mirror of [-1, 1]) {
        const text = new Text({ text: (Math.abs(angle) / Math.PI * 180).toFixed(), style});
        const offset = (mirror == 1 ? 0 : 1) * text.width;
        text.position.set(middle + mirror * middle / Math.abs(portion) + mirror * offset + mirror * style.fontSize * PITCH_MARK_TEXT_MARGIN, middle - size / portion - style.fontSize / 1.5);
        pitch_mark.addChild(text);
    }

    return pitch_mark;
}

export function getStandardPitchMarks(size: number, fov: number): Container<Container<Graphics | Text>> {
    const pitch_marks: Container<Container<Graphics | Text>> = new Container();

    const angles = [
        fov / 9,
        fov / 4.5,
        fov / 3
    ]
    for (const angle of angles) {
        pitch_marks.addChild(getPitchMark(size, fov, angle));
        pitch_marks.addChild(getPitchMark(size, fov, -angle));
    }

    return pitch_marks;
}


const ROLL_INDICATOR_COLOR: string = "white";
const ROLL_INDICATOR_HEIGHT: number = 1/20;
const ROLL_INDICATOR_WIDTH: number = 1/20;

export function getRollIndicator(size: number) {
    const roll_indicator = new Graphics();
    const middle = size / 2;
    roll_indicator.poly([
        {x: middle, y: size * BLIND_MARGIN},
        {x: middle - size * ROLL_INDICATOR_WIDTH / 2, y: size * BLIND_MARGIN + size * ROLL_INDICATOR_HEIGHT},
        {x: middle + size * ROLL_INDICATOR_WIDTH / 2, y: size * BLIND_MARGIN + size * ROLL_INDICATOR_HEIGHT}
    ]).fill(ROLL_INDICATOR_COLOR)
    return roll_indicator;
}