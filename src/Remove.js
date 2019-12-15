import React from "react"
import { MinusCircle } from 'react-feather';


function Remove(props) {
    return (
        <MinusCircle onClick={props.handleRemove} id={props.id} className="remove" size={30}/>
    )
}

export default Remove