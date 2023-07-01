const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const HttpError = require("../utils/HttpError");

//1version
const taskPath = path.join(__dirname, "..", "db", "tasks.json");

//2version
//const taskPath = path.join(process.cwd(), "db", "tasks.json");

const getAllTasksService = async () => {
  const json = await fs.readFile(taskPath);
  return JSON.parse(json);
};

const getTaskService = async (id) => {
  const tasks = await getAllTasksService();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw new HttpError(404, "This task does not exist!");
  }

  return task;
};

const addTaskService = async (body) => {
  const tasks = await getAllTasksService();
  const newTask = { id: crypto.randomUUID(), ...body };
  tasks.push(newTask);
  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 4));
  return newTask;
};

const updateTaskService = async (id, body) => {
  const tasks = await getAllTasksService();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new HttpError(404, "This task does not exist!");
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...body };

  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 4));
  return tasks[taskIndex];
};

const deleteTaskService = async (id) => {
  const tasks = await getAllTasksService();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new HttpError(404, "This task does not exist!");
  }

  tasks.splice(taskIndex, 1);
  await fs.writeFile(taskPath, JSON.stringify(tasks, null, 4));
};

module.exports = {
  getAllTasksService,
  getTaskService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};
