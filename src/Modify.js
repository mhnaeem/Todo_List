import React from "react"
import { Edit2, Check } from 'react-feather';

function Modify(props) {
    return (
        !props.edit ? 
        <Edit2            
            name="modify"
            onClick={props.switchEdit}
            id={props.id}
            size={30}
        />
        :
        <Check
            name="modify"
            onClick={props.switchEdit}
            id={props.id}    
            size={30}    
        />
    )
}



export default Modify