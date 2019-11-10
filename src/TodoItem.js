/**
 * Challenge: Style the completed todo items differently from the incomplete items.
 */

import React from "react"
import "./style.css"
import Modify from "./Modify"
import Remove from "./Remove"

function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">

            {(props.item.edit) ?
                <input
                    type="text"
                    id={props.item.id}
                    defaultValue={props.item.text}
                    onChange={props.handleModify}
                    name="text"
                />
                :
                <input
                    type="checkbox"
                    checked={props.item.completed}
                    onChange={() => props.handleChange(props.item.id)}
                />
            }
            {(!props.item.edit) ?
                <p style={props.item.completed ? completedStyle : null}>{props.item.text}</p>
                : null
            }

            <Modify switchEdit={props.switchEdit} id={props.item.id} edit={props.item.edit} />
            <Remove handleRemove={props.handleRemove} id={props.item.id} />

        </div>
    )
}

export default TodoItem