const HttpError = require("../utils/HttpError");

const { Task } = require("../models/Task");

const getAllTasksService = async () => {
  return await Task.find();
};

const getTaskService = async (id) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new HttpError(404, "This task does not exist!");
  }

  return task;
};

const addTaskService = async (body) => {
  return await Task.create(body);
};

const updateTaskService = async (id, body) => {
  const task = await Task.findByIdAndUpdate(id, body, { new: true });

  if (!task) {
    throw new HttpError(404, "This task does not exist!");
  }

  return task;
};

const deleteTaskService = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new HttpError(404, "This task does not exist!");
  }
};

module.exports = {
  getAllTasksService,
  getTaskService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};
