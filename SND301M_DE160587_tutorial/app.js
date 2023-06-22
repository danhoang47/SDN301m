const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");

const databaseUrl = 'mongodb://127.0.0.1:27017';
const client = mongoose.connect(databaseUrl);

client.then(
    (db) => {
        console.log("Connected successfully to server")
    },
    (err) => {
        console.log(err);
    }
)


const port = 3000;
const hostname = 'localhost';

const app = express();

app.use(logger("dev"))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

const tutorialRouter = require("./routers/tutorials.router")

app.use("/tutorials", tutorialRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.end(err)
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});



