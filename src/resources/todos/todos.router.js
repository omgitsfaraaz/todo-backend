import { Router } from "express";
import { 
    createTodo, 
    deleteTodo, 
    getTodos, 
    patchTodo 
} from "./todos.controller.js";

export const todoRouter = Router();
export const delTodoRouter = Router();
// export const patchTodoRouter = Router();

todoRouter.route('/')
    .get(getTodos)
    .post(createTodo)

delTodoRouter.route('/')
    .post(deleteTodo)

todoRouter.route('/:id')
    .patch(patchTodo)