// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;
const TASKS_FILE = 'tasks.json';

// app.use(cors());

app.use(cors({
  // origin: 'pomodoro-steel-pi.vercel.app'
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));

app.use(bodyParser.json());

// Load tasks from file
const loadTasks = () => {
  if (fs.existsSync(TASKS_FILE)) {
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
  }
  return [];
};

// Save tasks to file
const saveTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};


// Get tasks
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Get tasks
app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
  const tasks = loadTasks();
  tasks.push(req.body.task);
  saveTasks(tasks);
  res.status(201).json({ message: 'Task added' });
});

// Delete task
app.delete('/tasks/:index', (req, res) => {
  const tasks = loadTasks();
  tasks.splice(req.params.index, 1);
  saveTasks(tasks);
  res.status(200).json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});