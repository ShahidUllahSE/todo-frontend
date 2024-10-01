// src/components/UrgentTodo.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrgentTodos } from '../redux/actions';

const UrgentTodo = () => {
  const dispatch = useDispatch();
  const urgentTodos = useSelector((state) => state.urgentTodos);

  useEffect(() => {
    dispatch(fetchUrgentTodos());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Urgent Todos</h2>
      <ul>
        {urgentTodos.map(todo => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default UrgentTodo;
