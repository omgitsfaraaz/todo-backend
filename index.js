import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { 
    delTodoRouter, 
    todoRouter 
} from './src/resources/todos/todos.router.js';

// instance
const app = express()

// constants

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use('/api/todos', todoRouter)
app.use('/api/delete-todo', delTodoRouter)

// Get Homepage
app.get('/', (req, res) => {
    res.end('This is an api for todos')
})

// Listening at port 3001
app.listen(3001, () => console.log('server has started at port 3001'))