const {
  getAllTasksService,
  getTaskService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskService(taskId);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const addTask = async (req, res, next) => {
  try {
    const task = await addTaskService(req.body);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await updateTaskService(taskId, req.body);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await deleteTaskService(taskId, req.body);

    res.json({ message: "Task was deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTask, addTask, updateTask, deleteTask };
