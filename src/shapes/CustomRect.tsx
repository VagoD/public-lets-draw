import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Circle, Rect } from "react-konva";
import { defaultRectValues } from "../utils/ShapeCreater";

export type CustomRectProps = {
    rect: Konva.Rect,
    id: number,
    isSelected: boolean,
    setRectPosition: (x: number, y: number, width: number, height: number) => void,
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void,
    onClick: () => void,
}

export const CustomRect = (props: CustomRectProps) => {

    const topLAnchor = useRef<Konva.Circle>(null);
    const topRAnchor = useRef<Konva.Circle>(null);
    const bottomLAnchor = useRef<Konva.Circle>(null);
    const bottomRAnchor = useRef<Konva.Circle>(null);
    const [isDragging, setDragging] = useState(false);

    const dragTopR = () => {
        if (topLAnchor.current && topRAnchor.current && bottomLAnchor.current && bottomRAnchor.current) {
            const x = topLAnchor.current.x();
            const y = topRAnchor.current.y();
            props.setRectPosition(x, y, topRAnchor.current.x() - x, bottomLAnchor.current.y() - y);
        }
    }

    const dragTopL = () => {
        if (topLAnchor.current && topRAnchor.current && bottomLAnchor.current && bottomRAnchor.current) {
            const x = topLAnchor.current.x();
            const y = topLAnchor.current.y();
            props.setRectPosition(x, y, topRAnchor.current.x() - x, bottomLAnchor.current.y() - y);
        }
    }

    const dragBottomR = () => {
        if (topLAnchor.current && topRAnchor.current && bottomLAnchor.current && bottomRAnchor.current) {
            const x = topLAnchor.current.x();
            const y = topLAnchor.current.y();
            props.setRectPosition(x, y, bottomRAnchor.current.x() - x, bottomRAnchor.current.y() - y);
        }
    }

    const dragBottomL = () => {
        if (topLAnchor.current && topRAnchor.current && bottomLAnchor.current && bottomRAnchor.current) {
            const x = bottomLAnchor.current.x();
            const y = topLAnchor.current.y();
            props.setRectPosition(x, y, topRAnchor.current.x() - x, bottomLAnchor.current.y() - y);
        }
    }

    return (
        <>
            <Rect {...defaultRectValues(props.isSelected)}
                {...props.rect.attrs}
                key={'rect-' + props.id}
                onDragStart={() => setDragging(true)}
                onDragEnd={(e) => { props.onDragEnd(e); setDragging(false); }}
                onClick={props.onClick}
            />
            {props.isSelected && !isDragging && <>
                <Circle key={'topL-' + props.id} draggable radius={15} fill={"green"} x={props.rect.x()} y={props.rect.y()} ref={topLAnchor} onDragMove={dragTopL} />
                <Circle key={'topR-' + props.id} draggable radius={15} fill={"green"} x={props.rect.x() + props.rect.width()} y={props.rect.y()} ref={topRAnchor} onDragMove={dragTopR} />
                <Circle key={'bottomL-' + props.id} draggable radius={15} fill={"green"} x={props.rect.x()} y={props.rect.y() + props.rect.height()} ref={bottomLAnchor} onDragMove={dragBottomL} />
                <Circle key={'bottomR-' + props.id} draggable radius={15} fill={"green"} x={props.rect.x() + props.rect.width()} y={props.rect.y() + props.rect.height()} ref={bottomRAnchor} onDragMove={dragBottomR} />
            </>}
        </>

    )
}