import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // Import redux-thunk middleware
import rootReducer from '../redux/reducer';

// Create store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
