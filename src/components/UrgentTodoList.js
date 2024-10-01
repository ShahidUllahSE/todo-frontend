import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrgentTodos, createUrgentTodo } from '../redux/actions';

const UrgentTodoList = () => {
  const dispatch = useDispatch();
  const urgentTodos = useSelector((state) => state.urgentTodos);

  useEffect(() => {
    dispatch(fetchUrgentTodos());
  }, [dispatch]);

  const handleAddTodo = (text) => {
    dispatch(createUrgentTodo({ text }));
  };

  return (
    <div>
      <h2>Urgent Todos</h2>
      <ul>
        {urgentTodos.map(todo => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => handleAddTodo('New Urgent Todo')}>Add Urgent Todo</button>
    </div>
  );
};

export default UrgentTodoList;
