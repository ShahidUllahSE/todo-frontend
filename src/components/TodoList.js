import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTodos, removeTodo, toggleTodo, updateTodo } from '../redux/actions';

const TodoList = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editTodoId, setEditTodoId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  // Fetch todos from the backend when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        dispatch(setTodos(response.data)); // Set todos from the backend
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  // Handle todo update (persist to backend)
  const handleSaveUpdate = async (id) => {
    if (updatedText.trim()) {
      try {
        // Send a PUT request to update the todo in the backend
        await axios.put(`http://localhost:5000/api/todos/${id}`, { text: updatedText });

        // Dispatch the update action to update the Redux state
        dispatch(updateTodo(id, { text: updatedText }));

        // Clear the editing state
        setEditTodoId(null);
        setUpdatedText('');
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  // Handle todo delete (persist to backend)
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to remove the todo from the backend
      await axios.delete(`http://localhost:5000/api/todos/${id}`);

      // Dispatch the action to remove the todo from Redux state
      dispatch(removeTodo(id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Handle edit mode
  const handleUpdate = (todo) => {
    if (editTodoId === todo._id) {
      // If clicked again, clear the editing state
      setEditTodoId(null);
      setUpdatedText('');
    } else {
      // Set the current todo to edit
      setEditTodoId(todo._id);
      setUpdatedText(todo.text); // Pre-fill the text input with current todo text
    }
  };

  return (
    <ul className="list-none">
      {todos.map((todo) => (
        <li key={todo._id} className="flex justify-between items-center mb-2">
          <span
            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
            onClick={() => dispatch(toggleTodo(todo._id))} // Toggle the completed status
          >
            {todo.text}
          </span>

          {/* Update functionality */}
          {editTodoId === todo._id ? (
            <div className="flex items-center">
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                className="border rounded p-1 mr-2"
              />
              <button
                onClick={() => handleSaveUpdate(todo._id)} // Save the updated text
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdate(todo)} // Start editing
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(todo._id)} // Delete the todo
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
