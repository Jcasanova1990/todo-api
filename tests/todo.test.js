require("dotenv").config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const server = app.listen(8080, () => console.log('Testing on PORT 8080'));
const Todo = require('../models/todo');

let createdTodo; 

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test the todos endpoints', () => {
  test('GET /todos - Get all todo items', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /todos - Create a new todo item', async () => {
    const todoData = { title: 'test', description: 'testdes' };
    const response = await request(app).post('/todos').send(todoData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual(todoData.title);
    expect(response.body.description).toEqual(todoData.description);
    expect(response.body).toHaveProperty('_id');
    createdTodo = response.body; 
  });

  test('GET /todos/:id - Get a specific todo item', async () => {
    const response = await request(app).get(`/todos/${createdTodo._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(createdTodo);
  });

  test('PUT /todos/:id - Update a specific todo item', async () => {
    const updatedData = { title: 'Updated test', description: 'Updated description' };
    const response = await request(app).put(`/todos/${createdTodo._id}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual(updatedData.title);
    expect(response.body.description).toEqual(updatedData.description);
  });

  test('DELETE /todos/:id - Delete a specific todo item', async () => {
    const response = await request(app).delete(`/todos/${createdTodo._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual('Updated test'); 
    expect(response.body.description).toEqual('Updated description'); 
  });
  
});
