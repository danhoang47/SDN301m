const express = require("express");

const router = express.Router();

router.all("/", (_, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
});

router.get("/", (_, res) => {
	res.end("Will send all the promotions to you!");
});

router.post("/", (req, res) => {
	res.end(
		`Will add the promotion: ${req.body.name} with details ${req.body.description}`
	);
});

router.delete("/", (_, res) => {
	res.end("Deleting all promotions");
});

router.post("/:promoId", (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /promotion/${req.params.promoId}`);
});

router.put("/:promoId", (req, res) => {
	res.write(`Updating the promotion ${req.params.promoId}\n`);
	res.end(
		`Will update the promotion: ${req.body.name} with details ${req.body.description}`
	);
});

router.put('/', (_, res) => {
    res.statusCode = 403;
    res.end("PUT operation not support on /promotion")
})

module.exports = router