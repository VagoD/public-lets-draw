import Konva from "konva"
import { createContext, Dispatch, useState } from "react";

type ShapeContextType = {
    shapes: Konva.Shape[];
    setShapes: Dispatch<React.SetStateAction<Konva.Shape[]>>;
    selectedShapeId: number | undefined;
    setSelectedShapeId: Dispatch<React.SetStateAction<number | undefined>>;
    mutateShapeById: (id: number, callback: (shape: Konva.Shape) => void) => void;
    removeShapeById: (id: number) => void;
}

const initialShapeContext: ShapeContextType = {
    shapes: [],
    setShapes: () => { },
    selectedShapeId: undefined,
    setSelectedShapeId: () => { },
    mutateShapeById: () => { },
    removeShapeById: () => { },
}

export const ShapeContext = createContext(initialShapeContext);

export const ShapeContextProvider = ({ children }: { children: JSX.Element }) => {
    const [shapes, setShapes] = useState<Konva.Shape[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState<number | undefined>(undefined);
    const mutateShapeById = (id: number, callback: (shape: Konva.Shape) => void) => {
        setShapes(shapes.map((shape, inx) => {
            if (inx === id) {
                callback(shape);
            }
            return shape
        }));
    }

    const removeShapeById = (id: number) => {
        setShapes(shapes.filter((_shape, inx) => inx !== id));
        setSelectedShapeId(undefined);
    }

    return (
        <ShapeContext.Provider value={{ shapes, setShapes, selectedShapeId, setSelectedShapeId, mutateShapeById, removeShapeById }}>
            {children}
        </ShapeContext.Provider>
    )
}