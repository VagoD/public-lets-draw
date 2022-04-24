import { Stage, Layer } from 'react-konva';
import { useState, useRef, useContext, useMemo, useEffect } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import "./drawing-area.css";
import { Vector2d } from 'konva/lib/types';
import { ShapeContext } from '../utils/ShapeContextProvider';
import { ToolContext } from '../utils/ToolContextProvider';
import { ShapeDrawer, } from '../utils/ShapeDrawer';
import { createShapeFromVectors } from '../utils/ShapeCreater';

const DrawingArea = () => {

    const isDrawing = useRef(false);
    const handleKeyEventRef = useRef<(event: KeyboardEvent) => void>();
    const { shapes, setShapes, selectedShapeId, setSelectedShapeId, removeShapeById, mutateShapeById } = useContext(ShapeContext);
    const { selectedTool } = useContext(ToolContext);
    const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [startVector, setStartVector] = useState<Vector2d | null>();
    const [endVector, setEndVector] = useState<Vector2d | null>();



    useEffect(() => {
        handleKeyEventRef.current = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape': setSelectedShapeId(undefined); setStartVector(null); setEndVector(null); break;
                case 'Delete': { selectedShapeId !== undefined && removeShapeById(selectedShapeId) }; break;
            }
        };
    }, [handleKeyEventRef, selectedShapeId, setSelectedShapeId, removeShapeById, setStartVector, setEndVector]);

    useEffect(() => {
        window.addEventListener('keydown', (e) => { handleKeyEventRef.current && handleKeyEventRef.current(e) });
        window.addEventListener('resize', () => setScreenSize({ width: window.innerWidth, height: window.innerHeight }));
        return () => {
            window.removeEventListener('keydown', (e) => { handleKeyEventRef.current && handleKeyEventRef.current(e) });
            window.removeEventListener('resize', () => setScreenSize({ width: window.innerWidth, height: window.innerHeight }));
        }
    }, []);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (e.target === e.target.getStage()) {
            setSelectedShapeId(undefined);
        }
        if (selectedTool) {
            isDrawing.current = true;
            setStartVector(e?.target?.getStage()?.getPointerPosition());
        }

    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (!isDrawing.current) {
            return;
        }
        setEndVector(e?.target?.getStage()?.getPointerPosition());
    };

    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
        if (selectedTool) {
            isDrawing.current = false;
            if (startVector && endVector && selectedTool) {
                const newShape = createShapeFromVectors(startVector, endVector, selectedTool);
                setShapes(shapes.concat([newShape]));
            }
            setStartVector(null);
            setEndVector(null);
        }
    };

    const drawAllShapes = useMemo(() => {
        return shapes.map((shape, id) =>
            ShapeDrawer({ shape, id, selectedShapeId, setSelectedShapeId, mutateShapeById, selectedTool }))
    }, [shapes, ShapeDrawer, selectedShapeId, setSelectedShapeId, mutateShapeById, selectedTool])

    const drawCurrentShape = () => {
        if (isDrawing && selectedTool && startVector && endVector) {
            const currentShape = createShapeFromVectors(startVector, endVector, selectedTool);
            return ShapeDrawer({ shape: currentShape, id: 10, selectedShapeId, setSelectedShapeId, mutateShapeById, selectedTool })
        }

    }

    return (
        <div className='canvas'>
            <Stage
                width={screenSize.width - 100}
                height={screenSize.height - 80}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                className="canvas-stage"
            >
                <Layer>
                    {drawAllShapes}
                    {drawCurrentShape()}
                </Layer>
            </Stage>
        </div >
    )
}

export default DrawingArea;