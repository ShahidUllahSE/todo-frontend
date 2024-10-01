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
// Thunk to toggle the completion status of a todo and update the backend
export const toggleTodo = (id, currentCompleted) => async (dispatch) => {
  try {
    // Toggle the completed status by sending a patch request
    const updatedTodo = { completed: !currentCompleted };
    const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, updatedTodo);
    
    // Dispatch the update to the reducer
    dispatch(updateTodo(id, response.data));
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};


// Update a todo (this will include both text update and due date)
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


// actions/todoActions.js

export const createProfessionalTodo = (todoData) => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/api/professional-todos', todoData);
  dispatch({ type: 'CREATE_PROFESSIONAL_TODO', payload: response.data });
};

export const createUrgentTodo = (todoData) => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/api/urgent-todos', todoData);
  dispatch({ type: 'CREATE_URGENT_TODO', payload: response.data });
};

export const fetchProfessionalTodos = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/professional-todos');
  dispatch({ type: 'SET_PROFESSIONAL_TODOS', payload: response.data });
};

export const fetchUrgentTodos = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/urgent-todos');
  dispatch({ type: 'SET_URGENT_TODOS', payload: response.data });
};



