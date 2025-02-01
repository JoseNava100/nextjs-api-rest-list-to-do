'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskManager() {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'low',
        due_date: '',
        completed: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        } else {
            fetchTasks();
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/task', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.status === 404) {
                console.log(data.message);
                setTasks([]);
            } else if (response.ok) {
                setTasks(data.data);
            }
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const addTask = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });
            const data = await response.json();
            if (response.ok) {
                setNewTask({
                    title: '',
                    description: '',
                    priority: 'low',
                    due_date: '',
                    completed: false,
                });
                setIsModalOpen(false);
                fetchTasks();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                fetchTasks();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const toggleTaskCompletion = async (id, completed) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/api/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !completed }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchTasks();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error toggling task completion', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Task Manager</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Organize and manage your tasks efficiently.</p>
                </div>
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Add Task
                    </button>
                </div>
                <div className="flex flex-wrap -m-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-4 w-full md:w-1/2 lg:w-1/3">
                            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                                        {task.priority}
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{task.title}</h1>
                                    <p className="leading-relaxed mb-3">{task.description}</p>
                                    <p className="leading-relaxed mb-3">Expiration date: {task.due_date}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="flex-1 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
                                        >
                                            Eliminate
                                        </button>
                                        <button
                                            onClick={() => toggleTaskCompletion(task.id, task.completed)}
                                            className={`flex-1 ${task.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white py-1 px-3 rounded-lg hover:${task.completed ? 'bg-yellow-600' : 'bg-green-600'} transition-colors duration-200`}
                                        >
                                            {task.completed ? 'Undo' : 'Complete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal para agregar tarea */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="title"
                                        value={newTask.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <textarea
                                        name="description"
                                        value={newTask.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                        name="priority"
                                        value={newTask.priority}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={newTask.due_date}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={addTask}
                                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            Add Task
                                        </button>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}