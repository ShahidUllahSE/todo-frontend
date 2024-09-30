    import React, { useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import axios from 'axios';
    import { setTodos, removeTodo, toggleTodo } from '../redux/actions';

    const TodoList = () => {
    const todos = useSelector((state) => state);
    const dispatch = useDispatch();

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

    return (
        <ul className="list-none">
        {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center mb-2">
            <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
                {todo.text}
            </span>
            <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 text-white p-2 rounded"
            >
                Delete
            </button>
            </li>
        ))}
        </ul>
    );
    };

    export default TodoList;
