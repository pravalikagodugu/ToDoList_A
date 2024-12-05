import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    // State management
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        task: '',
        status: 'Pending',
        deadline: '',
    });
    const [editingTodo, setEditingTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // API base URL
    const API_BASE_URL = 'http://127.0.0.1:3001';

    // Fetch todos
    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/getTodoList`);
            setTodos(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTodos();
    }, []);

    // Add new todo
    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.task || !newTodo.status || !newTodo.deadline) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/addTodoList`, newTodo);
            setNewTodo({ task: '', status: 'Pending', deadline: '' });
            fetchTodos();
        } catch (err) {
            alert('Failed to add todo');
            console.error('Add todo error:', err);
        }
    };

    // Update todo
    const handleUpdateTodo = async () => {
        if (!editingTodo) return;

        try {
            await axios.post(`${API_BASE_URL}/updateTodoList/${editingTodo._id}`, {
                task: editingTodo.task,
                status: editingTodo.status,
                deadline: editingTodo.deadline,
            });
            fetchTodos();
            setEditingTodo(null);
        } catch (err) {
            alert('Failed to update todo');
            console.error('Update todo error:', err);
        }
    };

    // Delete todo
    const handleDeleteTodo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/deleteTodoList/${id}`);
            fetchTodos();
        } catch (err) {
            alert('Failed to delete todo');
            console.error('Delete todo error:', err);
        }
    };

    // Render status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-green-600';
            case 'In Progress':
                return 'text-blue-600';
            case 'Pending':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-6">Todo List Manager</h1>

            {/* Error Handling */}
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {/* Add Todo Form */}
            <form
                onSubmit={handleAddTodo}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
            >
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Task"
                        value={newTodo.task}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, task: e.target.value })
                        }
                        className="input-field"
                        required
                    />
                    <select
                        value={newTodo.status}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, status: e.target.value })
                        }
                        className="input-field"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={newTodo.deadline}
                        onChange={(e) =>
                            setNewTodo({ ...newTodo, deadline: e.target.value })
                        }
                        className="input-field"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary mt-4">
                    Add Todo
                </button>
            </form>

            {/* Todo List */}
            {isLoading ? (
                <div className="text-center text-xl">Loading...</div>
            ) : todos.length === 0 ? (
                <div className="text-center text-gray-600">No todos found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="table-header">Task</th>
                                <th className="table-header">Status</th>
                                <th className="table-header">Deadline</th>
                                <th className="table-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr
                                    key={todo._id}
                                    className="border-b hover:bg-gray-100"
                                >
                                    {editingTodo?._id === todo._id ? (
                                        <>
                                            <td className="table-cell">
                                                <input
                                                    type="text"
                                                    value={editingTodo.task}
                                                    onChange={(e) =>
                                                        setEditingTodo({
                                                            ...editingTodo,
                                                            task: e.target.value,
                                                        })
                                                    }
                                                    className="input-field w-full"
                                                />
                                            </td>
                                            <td className="table-cell">
                                                <select
                                                    value={editingTodo.status}
                                                    onChange={(e) =>
                                                        setEditingTodo({
                                                            ...editingTodo,
                                                            status:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="input-field w-full"
                                                >
                                                    <option value="Pending">
                                                        Pending
                                                    </option>
                                                    <option value="In Progress">
                                                        In Progress
                                                    </option>
                                                    <option value="Completed">
                                                        Completed
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="table-cell">
                                                <input
                                                    type="datetime-local"
                                                    value={
                                                        editingTodo.deadline
                                                    }
                                                    onChange={(e) =>
                                                        setEditingTodo({
                                                            ...editingTodo,
                                                            deadline:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="input-field w-full"
                                                />
                                            </td>
                                            <td className="table-cell">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={
                                                            handleUpdateTodo
                                                        }
                                                        className="btn-success"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setEditingTodo(
                                                                null
                                                            )
                                                        }
                                                        className="btn-secondary"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="table-cell">
                                                {todo.task}
                                            </td>
                                            <td
                                                className={`table-cell ${getStatusColor(
                                                    todo.status
                                                )}`}
                                            >
                                                {todo.status}
                                            </td>
                                            <td className="table-cell">
                                                {todo.deadline
                                                    ? new Date(
                                                          todo.deadline
                                                      ).toLocaleString()
                                                    : 'No deadline'}
                                            </td>
                                            <td className="table-cell">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            setEditingTodo(todo)
                                                        }
                                                        className="btn-primary"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteTodo(
                                                                todo._id
                                                            )
                                                        }
                                                        className="btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TodoList;