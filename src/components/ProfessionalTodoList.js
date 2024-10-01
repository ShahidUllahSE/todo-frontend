import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfessionalTodos, createProfessionalTodo } from '../redux/actions';

const ProfessionalTodoList = () => {
  const dispatch = useDispatch();
  const professionalTodos = useSelector((state) => state.professionalTodos);

  useEffect(() => {
    dispatch(fetchProfessionalTodos());
  }, [dispatch]);

  const handleAddTodo = (text) => {
    dispatch(createProfessionalTodo({ text }));
  };

  return (
    <div>
      <h2>Professional Todos</h2>
      <ul>
        {professionalTodos.map(todo => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => handleAddTodo('New Professional Todo')}>Add Professional Todo</button>
    </div>
  );
};

export default ProfessionalTodoList;
