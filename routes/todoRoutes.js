const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

// GET /todos: Retrieve all todo items
router.get('/', todoController.getAllTodos);

// POST /todos: Create a new todo item
router.post('/', todoController.createTodo);

// GET /todos/:id: Retrieve a specific todo item by its ID
router.get('/:id', todoController.getTodoById);

// PUT /todos/:id: Update a specific todo item by its ID
router.put('/:id', todoController.updateTodoById);

// DELETE /todos/:id: Delete a specific todo item by its ID
router.delete('/:id', todoController.destroyTodoById);

module.exports = router;