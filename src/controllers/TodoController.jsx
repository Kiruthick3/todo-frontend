import * as TodoModel from "../models/TodoModel";

const getToken = () => localStorage.getItem("token");

const validateToken = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: Please log in first.");
  }
  return token;
};

export const fetchTodos = async () => {
  try {
    validateToken();
    const todos = await TodoModel.getTodos();
    // console.log("Todos fetched successfully:", todos);
    return todos;
  } catch (error) {
    // console.error("Error in fetchTodos:", error.message);
    throw error;
  }
};

export const createTodo = async (title, description) => {
  try {
    validateToken();
    return await TodoModel.addTodo(title, description);
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const editTodo = async (id, title, description) => {
  try {
    validateToken();
    return await TodoModel.updateTodo(id, title, description);
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const removeTodo = async (id) => {
  try {
    validateToken();
    await TodoModel.deleteTodo(id);
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const removeAllTodos = async () => {
  try {
    validateToken();
    await TodoModel.deleteAllTodos();
  } catch (error) {
    // console.error(error);
    throw error;
  }
};
