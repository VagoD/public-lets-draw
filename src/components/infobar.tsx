import "./infobar.css"

export const Infobar = () => {
    return <div className="infobar">
        <div>Keys:</div>
        <div>
            <div>Delete: Delete selected shape.</div>
            <div>Esc: Unselect shape. / Cancel drawing.</div>
        </div>
    </div>
}