import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Circle, Line } from "react-konva";
import { defaultLineValues } from "../utils/ShapeCreater";

export type CustomLineProps = {
    line: Konva.Line,
    id: number,
    isSelected: boolean,
    setLinePosition: (a: number[]) => void,
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void,
    onClick: () => void,
}

export const CustomLine = (props: CustomLineProps) => {

    const startAnchorRef = useRef<Konva.Circle>(null);
    const endAnchorRef = useRef<Konva.Circle>(null);
    const [isDragging, setDragging] = useState(false);

    const handleAnchorDragging = () => {
        if (startAnchorRef.current && endAnchorRef.current) {
            props.setLinePosition([
                startAnchorRef.current.x() - props.line.x(),
                startAnchorRef.current.y() - props.line.y(),
                endAnchorRef.current.x() - props.line.x(),
                endAnchorRef.current.y() - props.line.y()]);
        }

    }

    return <>
        <Line {...defaultLineValues(props.isSelected)}
            {...props.line.attrs}
            key={'line-' + props.id}
            onDragStart={() => setDragging(true)}
            onDragEnd={(e) => { props.onDragEnd(e); setDragging(false); }}
            onClick={props.onClick} />
        {props.isSelected && !isDragging &&
            <>
                <Circle key={'startAnch-' + props.id} draggable radius={15} fill={"green"} x={props.line.points()[0] + props.line.x()} y={props.line.points()[1] + props.line.y()} ref={startAnchorRef} onDragMove={handleAnchorDragging} />
                <Circle key={'endAnch-' + props.id} draggable radius={15} fill={"green"} x={props.line.points()[2] + props.line.x()} y={props.line.points()[3] + props.line.y()} ref={endAnchorRef} onDragMove={handleAnchorDragging} />
            </>}
    </>
}