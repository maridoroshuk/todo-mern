import axios from "axios";

const API_URL = "/api/todo/";

// Create new goal
const createTodo = async (data) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

// Get user goals
const getTodo = async (condition) => {
  const response = await axios.get(API_URL, condition);
  
  return response.data;
};

// Delete user goal
const deleteTodo = async (todoId) => {
  const response = await axios.delete(API_URL + todoId);

  return response.data;
};

// Update user goal
const updateTodo = async (todoId, body) => {
  const response = await axios.put(API_URL + todoId, body);
  
  return response.data;
};

const todoService = {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo
};

export default todoService;
