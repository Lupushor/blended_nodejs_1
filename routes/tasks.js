const { Router } = require("express");
const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");
const {validateBody} = require('../utils/validateBody');
const { addTaskValidationSchema, updateTaskValidationSchema } = require('../utils/validation/tasksValidationSchemas');

const { auth } = require('../middlewares/auth');

const router = Router();

router.use(auth);

//1 version
router.route("/").get(getAllTasks).post(validateBody(addTaskValidationSchema), addTask);
router.route("/:taskId").get(getTask).patch(validateBody(updateTaskValidationSchema), updateTask).delete(deleteTask);

//2 version
// router.get("/");
// router.get("/:taskId");
// router.post("/");
// router.patch("/:taskId");
// router.delete("/:taskId");

module.exports = { tasksRouter: router };