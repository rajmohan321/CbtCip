document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const completedTaskList = document.getElementById("completed-task-list");
  const newTaskInput = document.getElementById("new-task-input");
  const addTaskButton = document.getElementById("add-task-button");

  const apiUrl = "http://localhost:3000";

  // Fetch tasks from the server
  async function fetchTasks() {
    const response = await fetch(`${apiUrl}/tasks`);
    const tasks = await response.json();
    displayTasks(tasks);
  }

  // Fetch completed tasks from the server
  async function fetchCompletedTasks() {
    const response = await fetch(`${apiUrl}/completed-tasks`);
    const tasks = await response.json();
    displayCompletedTasks(tasks);
  }

  // Display tasks in the task list
  function displayTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (Added at: ${new Date(
        task.addedAt
      ).toLocaleString()})`;
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.classList.add("complete-button");
      completeButton.addEventListener("click", () => completeTask(task.id));
      li.appendChild(completeButton);
      taskList.appendChild(li);
    });
  }

  // Display completed tasks in the completed task list
  function displayCompletedTasks(tasks) {
    completedTaskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("completed");
      li.textContent = `${task.text} (Completed at: ${new Date(
        task.completedAt
      ).toLocaleString()})`;
      completedTaskList.appendChild(li);
    });
  }

  // Add a new task
  async function addTask() {
    const text = newTaskInput.value.trim();
    if (text) {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      displayTasks([...taskList.children, newTask]);
      newTaskInput.value = "";
      fetchTasks();
    }
  }

  // Complete a task
  async function completeTask(id) {
    await fetch(`${apiUrl}/complete-task/${id}`, { method: "POST" });
    fetchTasks();
    fetchCompletedTasks();
  }

  addTaskButton.addEventListener("click", addTask);
  fetchTasks();
  fetchCompletedTasks();
});
