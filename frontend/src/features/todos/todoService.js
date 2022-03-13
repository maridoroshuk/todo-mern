import axios from "axios";

const API_URL = "/api/todo/";

// Create new goal
const createTodo = async (data) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

// Get user goals
const getTodo = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Delete user goal
const deleteTodo = async (todoId) => {
  const response = await axios.delete(API_URL + todoId);

  return response.data;
};

const todoService = {
  createTodo,
  getTodo,
  deleteTodo,
};

export default todoService;
