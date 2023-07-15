const {
  getAllTasksService,
  getTaskService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const controllerWrapper = require('../utils/controllerWrapper');

let getTask = async (req, res) => {
    const { taskId } = req.params;
    const task = await getTaskService(taskId);
    res.json(task);
};
getTask = controllerWrapper(getTask);

const getAllTasks = controllerWrapper(async (_, res) => {
  const tasks = await getAllTasksService();
  res.json(tasks);
});

const addTask = controllerWrapper(async (req, res) => {
  const task = await addTaskService(req.body);
  res.json(task);
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await updateTaskService(taskId, req.body);
  res.json(task);
});

const deleteTask = controllerWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await deleteTaskService(taskId, req.body);
  res.json({ message: "Task was deleted" });
});

module.exports = { getAllTasks, getTask, addTask, updateTask, deleteTask };