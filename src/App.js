import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"
import Add from './Add';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.onAdditionChange = this.onAdditionChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.switchEdit = this.switchEdit.bind(this)
        this.handleDueDate = this.handleDueDate.bind(this)
        this.reRankAll = this.reRankAll.bind(this)
        this.handleArrowUp = this.handleArrowUp.bind(this)
        this.handleArrowDown = this.handleArrowDown.bind(this)
        this.prioritize = this.prioritize.bind(this)
        this.handleDifficulty = this.handleDifficulty.bind(this)
        this.handleImportance = this.handleImportance.bind(this)
    }

    prioritize(){
        this.setState(prevState => {
            const updatedTodos = prevState.todos
                .map(todo => {
                    return todo;
                })

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

            return {
                todos: this.reRankAll(newList)
            }
        })
    }


    reRankAll(todos){
        for (let i = 0; i < todos.length; i++){
            todos[i].rank = i+1;
        }
        return todos
    }

    handleRemove(e) {
        if(!window.confirm("Are you sure you want to remove the item?")){
            return
        }
        const { id } = e.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos
                .filter(item => {
                    return item.id != id;
                })
                .map(todo => {
                    return todo;
                })
            return {
                todos: this.reRankAll(updatedTodos)
            }
        })
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id == id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            
            for (let i = 0; i < updatedTodos.length; i++){
                if(updatedTodos[i].completed){
                    updatedTodos.splice(updatedTodos.length-1, 0, updatedTodos.splice(i, 1)[0])
                }
            }
            return {
                todos: updatedTodos
            }
        })
    }

    onAdditionChange() {
        let importance = document.getElementById("importance").options[document.getElementById("importance").selectedIndex].value
        let difficulty = document.getElementById("difficulty").options[document.getElementById("difficulty").selectedIndex].value
        let value = document.getElementById("additionField").value
        let selectedDate = document.getElementById("additionDate").value
        
        document.getElementById("additionField").value = ""
        
        this.setState(prevState => {

            const updatedTodos = prevState.todos.map(item => {
                return item
            });

            updatedTodos.unshift(
                {
                    id: Date.now(),
                    text: value,
                    completed: false,
                    rank: updatedTodos[updatedTodos.length-1].rank + 1,
                    edit: false,
                    dueDate: selectedDate,
                    difficulty: difficulty,
                    importance: importance
                }
            )
            return {
                todos: updatedTodos
            }
        })
    }

    handleModify(event) {
        const { id, value } = event.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(item => {
                if (item.id == id) {
                    item.text = value
                }
                return item
            })
            return {
                todos: updatedTodos
            }
        })
    }

    switchEdit(event) {
        const { id } = event.target
        this.setState(prevState => {
            const updatedTodo = prevState.todos.map(item => {
                if (item.id == id) {
                    item.edit = !item.edit;
                }
                return item
            })
            return {
                todos: updatedTodo
            }
        })
    }

    handleDueDate(date, id){
        
        this.setState(prevState => {
            const updatedTodo = prevState.todos.map(item => {
                if (item.id == id) {
                    item.dueDate = date
                }
                return item
            })
            return {
                todos: updatedTodo
            }
        })
    }

    handleArrowDown(event){
        const { id } = event.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(item => {
                return item
            })
            
            let from = 0
            let to = updatedTodos.length-1

            for (let i = 0; i < updatedTodos.length; i++){
                if (updatedTodos[i].id == id){
                    if (i + 1 <= updatedTodos.length-1){
                        if( (updatedTodos[i+1].completed && updatedTodos[i].completed) || (!updatedTodos[i+1].completed && !updatedTodos[i].completed)){
                            to = i + 1
                            from = i
                            updatedTodos.splice(to, 0, updatedTodos.splice(from, 1)[0]);
                        }
                    }
                    break;
                }
            }
            return {
                todos: this.reRankAll(updatedTodos)
            }
        })
    }

    handleArrowUp(event){
        const { id } = event.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(item => {
                return item
            })
            
            let from = 0
            let to = 0

            for (let i = 0; i < updatedTodos.length; i++){
                if (updatedTodos[i].id == id){
                    if (i - 1 >= 0){
                        if( (updatedTodos[i-1].completed && updatedTodos[i].completed) || (!updatedTodos[i-1].completed && !updatedTodos[i].completed) ){
                            to = i - 1
                            from = i
                            updatedTodos.splice(to, 0, updatedTodos.splice(from, 1)[0]);
                            break;
                        }
                    }
                }
            }

            return {
                todos: this.reRankAll(updatedTodos)
            }
        })
    }

    handleDifficulty(event){
        const { id, value } = event.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(item => {
                if(item.id == id){
                    item.difficulty = value
                }
                return item
            })
            return {
                todos: updatedTodos
            }
        }) 
    }

    handleImportance(event){
        const { id, value } = event.target
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(item => {
                if(item.id == id){
                    item.importance = value
                }
                return item
            })
            return {
                todos: updatedTodos
            }
        }) 
    }

    render() {
        const todoItems = this.state.todos
        .map(item => 
            <TodoItem 
                key={item.id} 
                item={item} 
                todos={this.state.todos}
                handleChange={this.handleChange} 
                handleModify={this.handleModify} 
                handleRemove={this.handleRemove} 
                switchEdit={this.switchEdit} 
                handleDueDate={this.handleDueDate}
                handleArrowUp={this.handleArrowUp}
                handleArrowDown={this.handleArrowDown}
                handleDifficulty={this.handleDifficulty}
                handleImportance={this.handleImportance}
            />
        )

        return (
            <div>
                <div className="todoTitle"><span>Hammad's To-Do List</span></div>
                <div className="prioritize"><button class="prioritizeButton" style={{backgroundColor:"#9a4ef1"}} onClick={this.prioritize}>Sort Based on Priority</button></div>
                <div className="todo-list">
                    {todoItems}
                    <Add onAdditionChange={this.onAdditionChange} handleDueDate={this.handleDueDate}/>
                </div>
            </div>
        )
    }
}

export default App