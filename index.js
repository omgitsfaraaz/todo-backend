import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// instance
const app = express()

// constants
let todos = [
    {
        id: 1,
        title: "Learn Mongo",
        completed: true
    },
    {
        id: 2,
        title: "Learn Express",
        completed: false
    },
    {
        id: 3,
        title: "Learn React",
        completed: false
    },
]

// Middlewares
app.use(bodyParser.json());
app.use(cors())

// Get Homepage
app.get('/', (req, res) => {
    res.end('This is an api for todos')
})

// get todos
app.get('/api/todos', (req, res) => {
    res.json({
        success: true,
        data: {
            todos: todos
        },
        error: null
    })
})

// create todo
app.post('/api/todos', (req, res) => {
    const title = req.body.title;
    if (!title) {
        return res.json({
            success: false,
            data: null,
            error: 'title field is required'
        })
    } else {
        const newTodo = {
            id: todos.length + 1,
            title: title,
            completed: false
        }
        todos.push(newTodo)
        return res.json({
            success: true,
            data: {
                todo: newTodo
            },
            error: null
        })
    }
})

// delete todo
app.post('/api/delete-todo', (req, res) => {
    const todoId = req.body.id;
    const deleteTodo = todos.find(data => data.id == todoId)
    if (!deleteTodo) {
        return res.json({
            success: false,
            data: null,
            error: 'This todo id does not exist'
        })
    } else {
        // let todoIndex = todos.indexOf(deleteTodo)
        let newtodos = todos.filter(data => data.id != todoId)
        // let newtodos = todos.slice(0, todoIndex)
        todos = newtodos
        return res.json({
            success: true,
            data: {
                todo: deleteTodo
            },
            error: null
        })
    }
})

// Listening at port 3001
app.listen(3001, () => console.log('server has started at port 3001'))