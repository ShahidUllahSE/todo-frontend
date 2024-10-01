import axios from "axios";
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_TODOS = 'SET_TODOS';
export const UPDATE_TODO = 'UPDATE_TODO';

// Add a new todo
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

// Set the initial list of todos
export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

// Remove a todo
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

// Toggle the completion status of a todo
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

// Update a todo
export const updateTodo = (id, updatedTodo) => ({
  type: UPDATE_TODO,
  payload: { id, updatedTodo },
});

// Thunk to fetch todos from the backend API
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/todos');
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

// Thunk to add a new todo to the backend and update the state
export const createTodo = (todo) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/todos', todo);
    dispatch(addTodo(response.data));
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

// Thunk to delete a todo from the backend and update the state
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    dispatch(removeTodo(id));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

// Thunk to update a todo in the backend and update the state
export const editTodo = (id, updatedTodo) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, updatedTodo);
    dispatch(updateTodo(id, response.data)); // Dispatch the updated todo
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};
