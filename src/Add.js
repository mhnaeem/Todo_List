import React from "react"
import "./style.css"

function Add(props) {
    return (
        <div className="todo-item">
            <p>New Item Here: </p>
            <input
                type="text"
                name="text"
                placeholder="Add a new item here"
                id="additionField"
            />
            <button onClick={props.onAdditionChange}>Add</button>
        </div>
    )
}

export default Add