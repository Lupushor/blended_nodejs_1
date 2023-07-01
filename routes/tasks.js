const { Router } = require("express");
const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");

const router = Router();

//1 version
router.route("/").get(getAllTasks).post(addTask);
router.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);

//2 version
// router.get("/");
// router.get("/:taskId");
// router.post("/");
// router.patch("/:taskId");
// router.delete("/:taskId");

module.exports = { tasksRouter: router };
