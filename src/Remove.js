import React from "react"

function Remove(props) {
    return (

        <button
            className="remove"
            onClick={props.handleRemove}
            id={props.id}
        >
            Remove
    </button>
    )
}

export default Remove