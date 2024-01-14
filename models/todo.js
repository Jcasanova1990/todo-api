const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

todoSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
  }
  next();
});

todoSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, 'secret');
  return token;
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
