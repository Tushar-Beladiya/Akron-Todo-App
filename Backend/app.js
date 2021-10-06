const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/router");
const { db } = require("./config/db");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

app.use(cors());

db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error: " + err));

// parse json request body!
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression!

// set root directory as __basedir
global.__basedir = __dirname;

app.get("/", (req, res) => res.send("INDEX"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on ${PORT}`));
