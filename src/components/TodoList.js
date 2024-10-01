import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTodos, removeTodo, toggleTodo, editTodo, createTodo } from '../redux/actions';
import moment from 'moment'; // Import moment for date handling
import TodoForm from './TodoForm';

const TodoList = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editTodoId, setEditTodoId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [dueDate, setDueDate] = useState(''); // State for due date
  const [newTodoText, setNewTodoText] = useState(''); // State for new todo text

  // Fetch todos from the backend when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleUpdate = (todo) => {
    if (editTodoId === todo._id) {
      setEditTodoId(null);
      setUpdatedText('');
      setDueDate(''); // Reset the due date
    } else {
      setEditTodoId(todo._id);
      setUpdatedText(todo.text);
      setDueDate(todo.dueDate ? moment(todo.dueDate).format('YYYY-MM-DD') : ''); // Set the due date if it exists
    }
  };

  const handleSaveUpdate = (id) => {
    if (updatedText.trim()) {
      dispatch(editTodo(id, { text: updatedText, dueDate })); // Pass the updated text and due date
      setEditTodoId(null);
      setUpdatedText('');
      setDueDate(''); // Clear the input fields
    }
  };

  const handleCreateTodo = async () => {
    if (newTodoText.trim()) {
      const todoData = {
        text: newTodoText,
        // dueDate: null, // Initially set dueDate to null; user can update it later
      };
      try {
        await axios.post('http://localhost:5000/api/todos', todoData); // Send new todo to the backend
        dispatch(createTodo(todoData)); // Dispatch the action to create a new todo
        setNewTodoText(''); // Clear the input field for new todo text
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    }
  };

  return (
    <div>
      {/* New Todo Form */}
      <div className="flex mb-4">
        {/* <TodoForm/> */}
        {/* <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="New todo"
          className="border rounded p-2 mr-2"
        /> */}
        {/* <button
          onClick={handleCreateTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button> */}
      </div>

      <ul className="list-none">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-4">
              {/* Toggle completion */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo._id))}
              />

              {/* Display todo text */}
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => dispatch(toggleTodo(todo._id))}
              >
                {todo.text}
              </span>

              {/* Display due date */}
              {todo.dueDate && (
                <span className="text-sm text-gray-500">
                  Due: {moment(todo.dueDate).format('MMMM Do YYYY')}
                </span>
              )}
            </div>

            {/* Update functionality */}
            {editTodoId === todo._id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  className="border rounded p-1 mr-2"
                />
                {/* <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border rounded p-1 mr-2"
                /> */}
                <button
                  onClick={() => handleSaveUpdate(todo._id)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(todo)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    dispatch(removeTodo(todo._id)); // Dispatch remove action
                    axios.delete(`http://localhost:5000/api/todos/${todo._id}`) // Delete from the backend
                      .catch(error => console.error('Error deleting todo:', error));
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
