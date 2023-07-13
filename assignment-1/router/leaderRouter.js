const express = require("express");

const router = express.Router();

router.all("/", (_, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
});

router.get("/", (_, res) => {
	res.end("Will send all the leaders to you!");
});

router.post("/", (req, res) => {
	res.end(
		`Will add the leader: ${req.body.name} with details ${req.body.description}`
	);
});

router.delete("/", (_, res) => {
	res.end("Deleting all leaders");
});

router.post("/:leaderId", (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /leader/${req.params.dishId}`);
});

router.put("/:leaderId", (req, res) => {
	res.write(`Updating the leader ${req.params.leaderId}\n`);
	res.end(
		`Will update the leader: ${req.body.name} with details ${req.body.description}`
	);
});

router.put('/', (_, res) => {
    res.statusCode = 403;
    res.end("PUT operation not support on /leaders")
})

module.exports = router