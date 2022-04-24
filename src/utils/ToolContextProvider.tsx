import { createContext, Dispatch, useState } from "react"
import { ToolEnum } from "./ToolEnum";

type ToolContextType = {
    selectedTool: ToolEnum | undefined;
    setSelectedTool: Dispatch<React.SetStateAction<ToolEnum | undefined>>;
}

const initialToolContext: ToolContextType = {
    selectedTool: undefined,
    setSelectedTool: () => { },
}

export const ToolContext = createContext<ToolContextType>(initialToolContext);

export const ToolContextProvider = ({ children }: { children: JSX.Element }) => {
    const [selectedTool, setSelectedTool] = useState<ToolEnum | undefined>();

    return (
        <ToolContext.Provider value={{
            selectedTool,
            setSelectedTool
        }}>
            {children}
        </ToolContext.Provider>


    )
}