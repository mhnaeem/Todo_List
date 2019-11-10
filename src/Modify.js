import React from "react"

function Modify(props) {
    return (

        <button
            name="modify"
            onClick={props.switchEdit}
            id={props.id}
        >
            {(!props.edit) ? "Modify" : "Done"}
        </button>
    )
}

export default Modify