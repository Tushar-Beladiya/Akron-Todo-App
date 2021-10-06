const express = require("express");
const { todoController } = require("../controllers");
const router = express.Router();

router
  .post("/create-todo", todoController.createTodo)
  .get("/get-todos", todoController.getTodos)
  .put("/get-todo/:id", todoController.getTodo)
  .delete("/delete-todo/:id", todoController.deleteTodo)
  .patch("/update-todo/:id", todoController.updateTodo)
  .patch("/compete-todo/:id", todoController.completeTodo)
  .get("/most-productive-day", todoController.mostproductiveDay);

module.exports = router;
