const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const url = "mongodb://127.0.0.1/conFusion";
const connect = mongoose.connect(url);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const leaderRouter = require("./routers/leaderRouter");
const promotionRouter = require("./routers/promotionRouter");
const dishRouter = require("./routers/dishRouter");

app.use("/leaders", leaderRouter);
app.use("/promotions", promotionRouter);
app.use("/dishes", dishRouter);
