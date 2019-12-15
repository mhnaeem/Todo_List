import React from "react"
import "./style.css"
import Modify from "./Modify"
import Remove from "./Remove"
import DueDate from "./DueDate"
import { ArrowUp, ArrowDown } from 'react-feather';
import "react-datepicker/dist/react-datepicker.css";


function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">
            <div className="arrows">
                <ArrowUp 
                    name="arrowUp"
                    className="arrowUp"
                    onClick={props.handleArrowUp}
                    id={props.item.id}
                    size={24}
                />
                <ArrowDown 
                    name="arrowDown"
                    className="arrowDown"
                    onClick={props.handleArrowDown}
                    id={props.item.id}
                    size={24}
                />
            </div>
            {(props.item.edit) ?
                getModificationArea(props)
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

            <div className="labels">
                {!props.item.completed && !props.item.edit ? returnProperSquares(props.todos, props.item):null}
            </div>
            <div className="buttons">
                <DueDate handleDueDate={props.handleDueDate} id={props.item.id} dueDate={props.item.dueDate} edit={props.item.edit}/>
                <Modify switchEdit={props.switchEdit} id={props.item.id} edit={props.item.edit} className="modify"/>
                <Remove handleRemove={props.handleRemove} id={props.item.id} className="remove"/>
            </div>

        </div>
    )
}

function returnProperSquares(updatedTodos, item){

    let actionValue = []

    for (let i = 0; i < updatedTodos.length; i++){
        if(!updatedTodos[i].completed){
            let dueDateVal = 0
            let difficultyVal = 0
            let importanceVal = 0

            if(updatedTodos[i].importance == "urgent"){
                importanceVal = 30
            }
            else if(updatedTodos[i].importance == "important"){
                importanceVal = 20
            }
            else if(updatedTodos[i].importance == "unimportant"){
                importanceVal = 10
            }

            if(updatedTodos[i].difficulty == "hard"){
                difficultyVal = 30
            }
            else if(updatedTodos[i].difficulty == "medium"){
                difficultyVal = 20
            }
            else if(updatedTodos[i].difficulty == "easy"){
                difficultyVal = 10
            }

            let timeDiff = new Date(updatedTodos[i].dueDate).getTime() - new Date().getTime()
            let dayDiff = timeDiff / (1000 * 3600 * 24); 
            
            if(dayDiff <= 1){
                dueDateVal = 40
            }
            else if(dayDiff <= 2){
                dueDateVal = 30
            }
            else if(dayDiff <= 3){
                dueDateVal = 20
            }
            else if(dayDiff <= 4){
                dueDateVal = 10
            }

            actionValue.push( [i, (difficultyVal*100) + (dueDateVal*115) + (importanceVal * 100)])
        }
        else{
            actionValue.push([i,-1000000])
        }
    }

    actionValue = actionValue.sort(function(a, b) {
        return b[1] - a[1];
        });

    let newList = []

    for (let j = 0; j < actionValue.length; j++){
        newList.push(updatedTodos[actionValue[j][0]])
    }

    let divs = {
        "hard": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"red"}}>H</p></div>,
        "medium": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"orange"}}>M</p></div>,
        "easy": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"green"}}>E</p></div>,
        "urgent": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"#9400D3"}}>Ur</p></div>,
        "important": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"#FF00FF"}}>Im</p></div>,
        "unimportant": <div style={{display:"contents"}}><p className="colourLabelBoxes" style={{backgroundColor:"#DDA0DD"}}>Un</p></div>
    }

    let priorityLabel = <div style={{display:"contents"}}><p className="colourLabelBoxes priorityLabel" >Priority</p></div>


    for(let i = 0; i < newList.length; i++){
        if (newList[i].id == item.id){
            if(i <= 1){
            return <div style={{padding:"0", margin:"0", display:"inline"}}><div style={{display:"inline-flex"}}>{divs[newList[i].difficulty]}{divs[newList[i].importance]}</div>{priorityLabel}</div>
            }
            return <div style={{display:"inline-flex"}}>{divs[newList[i].difficulty]}{divs[newList[i].importance]}</div>
        }
    }

}



function getModificationArea(props){
    return <div style={{display:"flex", flexDirection:"row-reverse", width:"80%"}}>
    
        <div>
            <div style={{margin:"0.5em 0 0.5em 0.4em"}}>
                <p style={{display:"inline", fontSize:"1rem", padding:"0em", margin:"1em"}}>Difficulty</p>
                <select id={props.item.id} value={props.item.difficulty} 
                onChange={event => props.handleDifficulty(event)}
                 style={ props.item.difficulty == "easy" ? {background:"green", color:"white"} : props.item.difficulty == "medium" ? {background:"orange", color:"white"} : props.item.difficulty == "hard" ? {background:"red", color:"white"} : {background:"white"}}>
                    <option style={{background:"green", color:"white"}} value="easy">Easy</option>
                    <option style={{background:"orange", color:"white"}} value="medium">Medium</option>
                    <option style={{background:"red", color:"white"}} value="hard">Hard</option>
                </select>
            </div>
            <div style={{margin:"0.5em 0 0.5em 0.4em"}}>
                <p style={{display:"inline", fontSize:"1rem", padding:"0em", margin:"1em"}}>Importance</p>
                <select id={props.item.id} value={props.item.importance} 
                onChange={event => props.handleImportance(event)} 
                style={ props.item.importance == "unimportant" ? {background:"#DDA0DD", color:"white"} : props.item.importance == "important" ? {background:"#FF00FF", color:"white"} : props.item.importance == "urgent" ? {background:"#9400D3", color:"white"} : {background:"white"}}>
                    <option style={{background:"#DDA0DD", color:"white"}} value="unimportant">Unimportant</option>
                    <option style={{background:"#FF00FF", color:"white"}} value="important">Important</option>
                    <option style={{background:"#9400D3", color:"white"}} value="urgent">Urgent</option>
                </select>
            </div>
        </div>
        <input
            type="text"
            id={props.item.id}
            defaultValue={props.item.text}
            onChange={props.handleModify}
            name="text"
            className="modifyInput"
            style={{display:"block"}}
        />
    </div>
}

export default TodoItem