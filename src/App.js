// src/App.js
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfessionalTodo from './components/ProfessionalTodo';

const App = () => {
  return (
    <div>
      <Header/>
      <Navbar/>
{/* <Router>
  <Routes>
  <Route path="/general" element={<TodoList />} />

  <Route path="/Professional" element={<ProfessionalTodo />} />
  </Routes>
</Router> */}

    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>  
    </div>
  );
};

export default App;
