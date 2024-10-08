import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_TODOS, UPDATE_TODO } from './actions';

const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      return state.filter((todo) => todo._id !== action.payload);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo._id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case UPDATE_TODO:
      return state.map((todo) =>
        todo._id === action.payload.id ? { ...todo, ...action.payload.updatedTodo } : todo
      );
    default:
      return state;
  }
};

export default todosReducer;
