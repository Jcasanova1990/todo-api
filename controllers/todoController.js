const todo = require('../models/todo');
const jwt = require('jsonwebtoken');


// jwt generate authentication token
exports.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id }, 'secret');
    return token;
  } catch (error) {
    // Handle the error appropriately, e.g., log it or return an error response
    console.error('Error generating auth token:', error);
    throw new Error('Internal Server Error');
  }
};

// GET /todos: Retrieve all todo items
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// POST /todos: Create a new todo item
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newTodo = new todo({ title, description });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// GET /todos/:id: Retrieve a specific todo item identified by its ID
exports.getTodoById = async (req, res, next) => {
  try {
    const todoItem = await todo.findById(req.params.id);
    if (!todoItem) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(todoItem);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// PUT /todos/:id: Update a specific todo item identified by its ID
exports.updateTodoById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updatedTodo = await todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(updatedTodo);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// DELETE /todos/:id: Delete a specific todo item identified by its ID
exports.deleteTodoById = async (req, res, next) => {
  try {
    const deletedTodo = await todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(deletedTodo);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
