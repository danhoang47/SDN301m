const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
var passport = require("passport");
const uploadRouter = require('./routes/uploadRouter');
const multer = require("multer");

const tutorialRouter = require("./routes/tutprialRouter");
const usersRouter = require("./routes/user");
// const auth = require("./service/auth");
var session = require("express-session");
var config = require("./config");
var FileStore = require("session-file-store")(session);

const url = config.mongoUrl;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("12345-67890"));
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const DBUrl = "mongodb://127.0.0.1:27017/tutorial";
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected correctly to db");
  },
  (err) => {
    console.log(err);
  }
);

// app.use(auth);

// app.use('/', indexRouter);
app.use("/tutorials", tutorialRouter);
app.use("/users", usersRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// function auth(req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error("You are not authenticated!");
//     err.status = 403;
//     next(err);
//   } else {
//     next();
//   }
// }

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  return res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = app;
