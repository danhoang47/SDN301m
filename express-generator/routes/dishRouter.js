const express = require("express");

const router = express.Router();

router.all("/", (_, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
});

router.get("/", (_, res) => {
	res.end("Will send all the dishes to you!");
});

router.post("/", (req, res) => {
	res.end(
		`Will add the dish: ${req.body.name} with details ${req.body.description}`
	);
});

router.delete("/", (_, res) => {
	res.end("Deleting all dishes");
});

router.post("/:dishId", (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
});

router.put("/:dishId", (req, res) => {
	res.write(`Updating the disk ${req.params.dishId}\n`);
	res.end(
		`Will update the dish: ${req.body.name} with details ${req.body.description}`
	);
});

router.put('/', (_, res) => {
    res.statusCode = 403;
    res.end("PUT operation not support on /dishes")
})

module.exports = router