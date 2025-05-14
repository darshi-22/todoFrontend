  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Todo from './components/Todo';
  import TodoForm from './components/TodoForm';

  const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;


  function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
  console.log('API_URL:', API_URL);  // Add this
  fetchTodos();
}, []);


    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos. Please try again later.');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    const handleAddTodo = async (todoData) => {
      try {
        const response = await axios.post(API_URL, todoData);
        setTodos([response.data, ...todos]);
        setError(null);
      } catch (err) {
        setError('Failed to add todo. Please try again.');
        console.error('Error adding todo:', err);
      }
    };

    const handleUpdateTodo = async (todoData) => {
      try {
        const response = await axios.patch(`${API_URL}/${editingTodo._id}`, todoData);
        setTodos(todos.map(todo => 
          todo._id === editingTodo._id ? response.data : todo
        ));
        setEditingTodo(null);
        setError(null);
      } catch (err) {
        setError('Failed to update todo. Please try again.');
        console.error('Error updating todo:', err);
      }
    };

    const handleToggleTodo = async (id) => {
      try {
        const todo = todos.find(t => t._id === id);
        const response = await axios.patch(`${API_URL}/${id}`, {
          completed: !todo.completed
        });
        setTodos(todos.map(todo => 
          todo._id === id ? response.data : todo
        ));
        setError(null);
      } catch (err) {
        setError('Failed to update todo status. Please try again.');
        console.error('Error toggling todo:', err);
      }
    };

    const handleDeleteTodo = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete todo. Please try again.');
        console.error('Error deleting todo:', err);
      }
    };

    const handleEditTodo = (todo) => {
      setEditingTodo(todo);
    };

    const handleSubmit = (todoData) => {
      if (editingTodo) {
        handleUpdateTodo(todoData);
      } else {
        handleAddTodo(todoData);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Todo App
          </h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <TodoForm
            onSubmit={handleSubmit}
            initialValues={editingTodo}
          />

          {loading ? (
            <div className="text-center text-gray-500">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="text-center text-gray-500">
              No todos yet. Add one above!
            </div>
          ) : (
            <div className="space-y-2">
              {todos.map(todo => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default App;
