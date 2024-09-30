export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_TODOS = 'SET_TODOS';

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

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});
