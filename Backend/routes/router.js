const express = require("express");

const router = express.Router();

const todoRouter = require("./todo.route");
const chartRouter = require("./chart.route");

router.use("/todo", todoRouter).use("/chart", chartRouter);

module.exports = router;
