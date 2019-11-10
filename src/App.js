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
    }

    handleRemove(event) {
        const { id } = event.target

        this.setState(prevState => {
            const updatedTodos = prevState.todos
                .filter(item => {
                    return item.id != id;
                })
                .map(todo => {
                    return todo;
                })
            return {
                todos: updatedTodos
            }
        })
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }

    onAdditionChange() {

        const value = document.getElementById("additionField").value

        this.setState(prevState => {
            let prevID = 0;
            if (prevState != null && prevState != undefined && prevState.todos != null && prevState.todos != undefined && prevState.todos.length >= 1) {
                prevID = prevState.todos[prevState.todos.length - 1].id;
                prevID++;
            }
            else {
                prevID = 1;
            }

            const updatedTodos = prevState.todos.map(item => {
                return item
            });

            updatedTodos.push(
                {
                    id: prevID,
                    text: value,
                    completed: false
                }
            )
            return {
                todos: updatedTodos
            }
        })
    }

    handleModify(event) {
        const { id, value, name } = event.target
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

    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} handleModify={this.handleModify} handleRemove={this.handleRemove} switchEdit={this.switchEdit} />)

        return (
            <div className="todo-list">
                {todoItems}
                <Add onAdditionChange={this.onAdditionChange} />
            </div>
        )
    }
}

export default App