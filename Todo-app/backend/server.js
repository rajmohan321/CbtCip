const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let completedTasks = [];

// Route to get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Route to get completed tasks
app.get("/completed-tasks", (req, res) => {
  res.json(completedTasks);
});

// Route to add a new task
app.post("/tasks", (req, res) => {
  const task = { id: Date.now(), text: req.body.text, addedAt: new Date() };
  tasks.push(task);
  res.status(201).json(task);
});

// Route to mark a task as complete
app.post("/complete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex > -1) {
    const completedTask = { ...tasks[taskIndex], completedAt: new Date() };
    completedTasks.push(completedTask);
    tasks.splice(taskIndex, 1);
    res.json(completedTask);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
