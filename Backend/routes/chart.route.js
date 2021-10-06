const express = require("express");
const { chartController } = require("../controllers");
const router = express.Router();

router.post("/todo-analytics", chartController.todoAnalytics);

module.exports = router;
