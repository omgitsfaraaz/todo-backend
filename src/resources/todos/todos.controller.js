import { todos } from "../../utils/db.js"

const todosResponseBuilder = (success, data, error) => {
    return {
        success, data, error
    }
}

// get all todos
export const getTodos = (req, res) => {
    res.status(200).json(todosResponseBuilder(true, { todos: todos }, null))
}

// create todo
export const createTodo = (req, res) => {
    const title = req.body.title;
    if (!title) {
        res.status(400).json(todosResponseBuilder(false, null, 'title field is required'))
    } else {
        const newTodo = {
            id: todos.length + 1,
            title: title,
            completed: false
        }
        todos.push(newTodo)
        res.status(200).json(todosResponseBuilder(true, { todo: newTodo }, null))
    }
}

// delete todo
export const deleteTodo = (req, res) => {
    const todoId = req.body.id;
    const deleteTodo = todos.find(data => data.id == todoId)
    if (!deleteTodo) {
        res.status(400).json(todosResponseBuilder(false, null, 'This todo id does not exist'))
    } else {
        const todoIndex = todos.findIndex((todo) => todo.id == todoId)
        todos.splice(todoIndex, 1)
        res.status(200).json(todosResponseBuilder(true, { todo: deleteTodo }, null))
    }
}

// patch todo
export const patchTodo = (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id == id)
    if (todoIndex == -1) {
        res.status(400).json(todosResponseBuilder(false, null, `Todo with id ${id} does not exist`))
    } else {
        let existingTodo = todos.find((todo) => todo.id == id)
        let updatedTodo = {
            id: existingTodo.id,
            title: req.body.title == undefined ? existingTodo.title : req.body.title,
            completed: req.body.completed == undefined ? existingTodo.completed : req.body.completed
        }
        todos.splice(todoIndex, 1, updatedTodo)
        res.status(200).json(todosResponseBuilder(true, { todo: updatedTodo }, null))
    }
}