// src/components/TodoForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addTodo } from '../redux/actions';
import { useLocation } from 'react-router-dom';
import ProfessionalTodoList from './ProfessionalTodoList';

const ProfessionalTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  // Determine the API endpoint based on the current route
  const getApiEndpoint = () => {
    if (location.pathname === '/professional') {
      return 'http://localhost:5000/api/professional-todos'; // API endpoint for Professional todos
    } else if (location.pathname === '/urgent') {
      return 'http://localhost:5000/api/urgent-todos'; // API endpoint for Urgent todos
    } else {
      return 'http://localhost:5000/api/general-todos'; // Default API endpoint for General todos
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        // Get the correct API endpoint
        const apiEndpoint = getApiEndpoint();

        // Send the new todo to the backend
        const response = await axios.post(apiEndpoint, {
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
      <ProfessionalTodoList/>
    </form>
  );
};

export default ProfessionalTodo;
