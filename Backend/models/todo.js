const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Todo = db.define(
  "todos",
  {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    completed_at: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Todo;
