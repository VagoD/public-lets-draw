import Konva from "konva"
import { LineCap } from "konva/lib/Shape";
import { LineConfig } from "konva/lib/shapes/Line";
import { RectConfig } from "konva/lib/shapes/Rect";
import { Vector2d } from "konva/lib/types";
import { ToolEnum } from "./ToolEnum";

export const defaultLineValues = (isSelected: boolean = false): LineConfig => ({
    stroke: "#df4b26",
    strokeWidth: isSelected ? 10 : 5,
    lineCap: "round" as LineCap,
    draggable: isSelected,
});

export const defaultRectValues = (isSelected: boolean = false): RectConfig => ({
    strokeWidth: isSelected ? 5 : 0,
    stroke: "green",
    fill: '#df4b26',
    draggable: isSelected,
})

const createLine = (start: Vector2d, end: Vector2d) => {
    return new Konva.Line({ points: [start.x, start.y, end.x, end.y], defaultLineValues });
}

const createRect = (start: Vector2d, end: Vector2d) => {
    return new Konva.Rect({ x: start.x, y: start.y, width: end.x - start.x, height: end.y - start.y, defaultRectValues });
}

export const createShapeFromVectors = (start: Vector2d, end: Vector2d, tool: ToolEnum): Konva.Shape => {
    switch (tool) {
        case ToolEnum.RECTANGLE: return createRect(start, end);
        case ToolEnum.LINE: default: return createLine(start, end);
    }
}