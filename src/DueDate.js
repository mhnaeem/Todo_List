import React from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"

function DueDate(props) {
    return (
        <div className="dueDateText">
            {props.edit ? getDatePicker(props) : getDateString(props.dueDate)}
        </div>
    )
}

function getDateString(dueDate){

    dueDate = new Date(dueDate)

    var month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    let hours = dueDate.getHours();
    let mins = dueDate.getMinutes();
    let day = dueDate.getDate();

    if(day < 10){
        day = "0" + day
    }

    if(hours < 10){
        hours = "0" + hours;
    }
    if(mins < 10){
        mins = "0" + mins;
    }

    var strDate = 'd-m-Y h:m'
    .replace('Y', dueDate.getFullYear())
    .replace('m', month[dueDate.getMonth()])
    .replace('d', day)
    .replace('h', hours)
    .replace('m', mins);

    return <p className="dueDateText">{strDate}</p>
}

function getDatePicker(props){
    return (    
    <DatePicker
        selected={props.dueDate}
        minDate={Date.now()}
        onChange={date => props.handleDueDate(date, props.id)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM dd yyyy h:mm"
    />)
}

export default DueDate