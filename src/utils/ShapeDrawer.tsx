import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeConfig, shapes } from "konva/lib/Shape";
import { CustomLine } from "../shapes/CustomLine";
import { CustomRect } from "../shapes/CustomRect";
import { ToolEnum } from "./ToolEnum";

export type ShapeDrawerProps = {
    shape: Konva.Shape,
    id: number,
    selectedShapeId: number | undefined,
    setSelectedShapeId: React.Dispatch<React.SetStateAction<number | undefined>>,
    mutateShapeById: (id: number, cb: (shape: Shape<ShapeConfig>) => void) => void,
    selectedTool?: ToolEnum,
}

export const ShapeDrawer = (props: ShapeDrawerProps) => {

    const dragLine = (e: KonvaEventObject<DragEvent>) => {
        props.mutateShapeById(props.id, (shape) => {
            shape.x(e.target.x());
            shape.y(e.target.y());
        })
    }
    const dragRect = (e: KonvaEventObject<DragEvent>) => {
        props.mutateShapeById(props.id, (shape) => {
            shape.x(e.target.x());
            shape.y(e.target.y());
        })
    }

    const setRectPosition = (x: number, y: number, width: number, height: number) => {
        props.mutateShapeById(props.id, (shape) => {
            shape.x(x);
            shape.y(y);
            shape.width(width);
            shape.height(height);
        })
    }

    const drawShape = (shape: Konva.Shape, id: number) => {
        const isSelected = props.selectedShapeId === id;
        switch (shape.getClassName()) {
            case 'Rect': {
                return <CustomRect
                    rect={shape as Konva.Rect}
                    id={id}
                    isSelected={isSelected}
                    setRectPosition={setRectPosition}
                    onDragEnd={dragRect}
                    onClick={() => !props.selectedTool && props.setSelectedShapeId(id)} />
            }
            case 'Line': default: {
                return <CustomLine
                    line={shape as Konva.Line}
                    id={id}
                    isSelected={isSelected}
                    setLinePosition={(points) => props.mutateShapeById(id, (shape) => (shape as Konva.Line).points(points))}
                    onDragEnd={dragLine}
                    onClick={() => !props.selectedTool && props.setSelectedShapeId(id)} />;
            }
        }
    }

    return drawShape(props.shape, props.id);
}