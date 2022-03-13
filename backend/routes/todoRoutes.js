const express = require("express");
const router = express.Router();
const {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoController");

router.route("/").get(getTodo).post(setTodo);
router.route("/:id").delete(updateTodo).put(deleteTodo);

module.exports = router;
