import React from "react"
import "./style.css"
import { PlusCircle } from 'react-feather';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";


function Add(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [difficulty, setDifficulty] = useState("easy");
    const [importance, setImportance] = useState("important");

    return (
        <div style={{display:"flex", flexDirection:"row-reverse", width:"80%"}}>
            <div style={{padding:"0.4em", marginLeft:"auto", marginRight:"2em", marginTop:"1em"}}><PlusCircle size={30} onClick={props.onAdditionChange}/> </div>
            
            <div>
                <div style={{margin:"0.5em 0 0.5em 0.4em"}}>
                    <p style={{display:"inline", fontSize:"1rem", padding:"0em", margin:"1em"}}>Due Date</p>
                    <DatePicker
                        id="additionDate"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={Date.now()}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM dd yyyy h:mm"
                    />
                </div>
                <div style={{margin:"0.5em 0 0.5em 0.4em"}}>
                    <p style={{display:"inline", fontSize:"1rem", padding:"0em", margin:"1em"}}>Difficulty</p>
                    <select id="difficulty" value={difficulty} onChange={event => setDifficulty(event.target.value)} style={ difficulty == "easy" ? {background:"green"} : difficulty == "medium" ? {background:"orange"} : difficulty == "hard" ? {background:"red"} : {background:"white"}}>
                        <option style={{background:"green"}} value="easy">Easy</option>
                        <option style={{background:"orange"}} value="medium">Medium</option>
                        <option style={{background:"red"}} value="hard">Hard</option>
                    </select>
                </div>
                <div style={{margin:"0.5em 0 0.5em 0.4em"}}>
                    <p style={{display:"inline", fontSize:"1rem", padding:"0em", margin:"1em"}}>Importance</p>
                    <select id="importance" value={importance} onChange={event => setImportance(event.target.value)} style={ importance == "unimportant" ? {background:"#DDA0DD"} : importance == "important" ? {background:"#FF00FF"} : importance == "urgent" ? {background:"#9400D3"} : {background:"white"}}>
                        <option style={{background:"#DDA0DD"}} value="unimportant">Unimportant</option>
                        <option style={{background:"#FF00FF"}} value="important">Important</option>
                        <option style={{background:"#9400D3"}} value="urgent">Urgent</option>
                    </select>
                </div>
            </div>
            <input
                type="text"
                name="text"
                placeholder="Add a new item here"
                id="additionField"
                style={{display:"block"}}
            />
        </div>
    )
}

export default Add