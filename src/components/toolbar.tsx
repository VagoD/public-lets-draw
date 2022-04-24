import "./toolbar.css";
import LineIcon from "../assets/line-icon.svg";
import CursorIcon from "../assets/cursor-icon.svg";
import RectangleIcon from "../assets/rectangle-icon.svg";
import { useContext } from "react"
import { ToolEnum } from "../utils/ToolEnum";
import { ToolContext } from "../utils/ToolContextProvider";

export const Toolbar = () => {

    const { selectedTool, setSelectedTool } = useContext(ToolContext);

    return (
        <div className="toolbar">
            <div className="toolbar-title">Toolbar</div>
            <img
                className={`icon ${selectedTool === undefined ? "selected" : ""}`}
                onClick={() => setSelectedTool(undefined)}
                src={CursorIcon}
                alt="Draw Line" />
            <img
                className={`icon ${selectedTool === ToolEnum.LINE ? "selected" : ""}`}
                onClick={() => setSelectedTool(ToolEnum.LINE)}
                src={LineIcon}
                alt="Draw Line" />
            <img
                className={`icon ${selectedTool === ToolEnum.RECTANGLE ? "selected" : ""}`}
                onClick={() => setSelectedTool(ToolEnum.RECTANGLE)}
                src={RectangleIcon}
                alt="Draw rectangle" />

        </div>)
}