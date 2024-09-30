import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addTodo } from '../redux/actions';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        // Send the new todo to the backend
        const response = await axios.post('http://localhost:5000/api/todos', {
          text: text.trim(),
        });

        // Dispatch the newly created todo to Redux store
        dispatch(addTodo(response.data));

        // Clear the input after adding
        setText('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded p-2 w-full mb-2"
        placeholder="Enter a new todo"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
