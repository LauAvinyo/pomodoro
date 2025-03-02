import React, { useState, useEffect } from 'react';

const API_URL = 'https://pomodoro-server-rouge.vercel.app/'; 
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the API
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Add a task via the API
  const addTask = () => {
    if (newTask.trim()) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask.trim() }),
      })
        .then(response => response.json())
        .then(() => {
          setTasks([...tasks, newTask.trim()]);
          setNewTask('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  // Remove a task via the API
  const removeTask = (index: number) => {
    fetch(`${API_URL}/tasks/${index}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setTasks(tasks.filter((_, i) => i !== index));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New task"
          className="flex-grow p-2 rounded-md bg-gray-800 text-white mr-2"
        />
        <button
          onClick={addTask}
          className="bg-purple-500 px-4 py-2 rounded-md text-white transition-all duration-200 ease-in-out transform hover:scale-110"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2 h-64 overflow-y-auto">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-gray-800 p-2 rounded-md flex justify-between items-center"
          >
            <span>{task}</span>
            <button
              onClick={() => removeTask(index)}
              className="bg-pink-500 px-2 py-1 rounded-md text-white ml-2 transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
