const todo = require('../models/todo');
const jwt = require('jsonwebtoken');

// jwt generate authentication token
exports.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id }, 'secret');
    return token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    throw new Error('Internal Server Error');
  }
};

// GET /todos: Retrieve all todo items
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};

// POST /todos: Create a new todo item
exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed} = req.body;
    const newTodo = new todo({ title, description, completed });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};

// GET /todos/:id: Retrieve a specific todo item identified by its ID
exports.getTodoById = async (req, res) => {
  try {
    const todoItem = await todo.findById(req.params.id);
    res.status(200).json(todoItem); // Move this line inside the try block
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};

// PUT /todos/:id: Update a specific todo item identified by its ID
exports.updateTodoById = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTodo = await todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};

// DELETE /todos/:id: Delete a specific todo item identified by its ID
exports.destroyTodoById = async (req, res) => {
  try {
    const deletedTodo = await todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
};
