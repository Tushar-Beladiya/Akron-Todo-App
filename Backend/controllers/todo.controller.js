const { Sequelize, Op } = require("sequelize");
const Todo = require("../models/todo");
const catchAsync = require("../utils/catchAsync");

exports.createTodo = catchAsync(async (req, res, next) => {
  const body = req.body;

  const postBody = {
    name: body.name,
    created_at: new Date(),
    status: "Incomplate",
  };
  const todoData = await Todo.create(postBody);
  res.json({ status: "Succuss", result: todoData });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.findAll();

  res.json({ status: "Success", result: todos });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const todo = await Todo.findOne({
    where: {
      id,
    },
  });

  res.json({ status: "success", result: todo });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleteTodo = await Todo.destroy({
    where: {
      id,
    },
  });
  res.json({ status: "Success", result: deleteTodo });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const postData = {
    name: body.name,
  };
  const update = await Todo.update(postData, {
    where: { id },
  });

  res.json({ status: "success", message: "updated successfully" });
});

exports.completeTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body.isChecked);
  const status = req.body.isChecked === true ? "completed" : "Incomplate";

  console.log(status);
  const body = {
    completed_at: new Date(),
    status,
    date: new Date(),
  };

  const todoData = await Todo.update(body, {
    where: {
      id,
    },
  });

  res.json({ status: "Success", message: "Task has been Completed" });
});

exports.mostproductiveDay = catchAsync(async (req, res, next) => {
  const data = await Todo.findAll({
    attributes: ["date", [Sequelize.literal(`COUNT(*)`), "Total"]],
    group: ["date"],
    order: [[Sequelize.literal("Total"), "desc"]],
    where: {
      date: {
        [Op.ne]: null,
      },
    },
  });

  return res.json({ status: "Success", result: data });
});
