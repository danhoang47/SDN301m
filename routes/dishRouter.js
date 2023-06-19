var authenticate = require("../service/authenticate");
const Dishes = require("../models/dishes");
var express = require("express");
var router = express.Router();
const cors = require("cors");

router.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	next();
});

router.get("/", (req, res, next) => {
	Dishes.find({})
		.populate("comments.author")
		.then(
			(dishes) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				return res.json(dishes);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
});

router.post("/", authenticate.verifyUser, (req, res, next) => {
	res.end(
		"Will add the dish: " +
			req.body.name +
			" with details: " +
			req.body.description
	);
});

router.put("/", authenticate.verifyUser, (req, res, next) => {
	res.statusCode = 403;
	res.end("PUT operation is not supported on /dished");
});

router.delete("/", authenticate.verifyUser, (req, res, next) => {
	res.end("Deleting all dishes");
});

// http://localhost:8080/dishes/3
router.get("/:dishId", (req, res, next) => {
	Dishes.findById(req.params.dishId)
		.populate("comments.author")
		.then(
			(dish) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				return res.json(dish);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
});

router.post("/:dishId", (req, res, next) => {
	res.statusCode = 403;
	res.end("POST operation is not supported on /dishes/" + req.params.dishId);
});

router.put("/:dishId", (req, res, next) => {
	res.write("Updating the dish: " + req.params.dishId + "\n");
	res.end(
		"Will update the dish: " +
			req.body.name +
			" with details: " +
			req.body.description
	);
});

router.delete("/:dishId", (req, res, next) => {
	res.end("Deleting the dish: " + req.params.dishId);
});

router
	.use("/:dishId/comments")
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.populate("comments.author")
			.then(
				(dish) => {
					if (dish != null) {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						return res.json(dish.comments);
					} else {
						err = new Error(`Dish ${req.params.dishId} not found`);
						err.status = 404;
						return next(err);
					}
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then(
				(dish) => {
					if (dish != null) {
						req.body.author = req.user._id;
						dish.comments.push(req.body);
						dish.save().then(
							(dish) => {
								Dishes.findById(dish._id)
									.populate("comments.author")
									.then((dish) => {
										res.statusCode = 200;
										res.setHeader(
											"Content-Type",
											"application/json"
										);
										return res.json(dish);
									});
							},
							(err) => next(err)
						);
					} else {
						err = new Error(`Dish ${req.params.dishId} not found`);
						err.status = 404;
						return next(err);
					}
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

router
	.use("/:dishId/comments/:commentId")
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.populate("comments.author")
			.then(
				(dish) => {
					if (
						dish !== null &&
						dish.comments.id(req.params.commentId) !== null
					) {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						return res.json(dish.comments.id(req.params.commentId));
					} else if (dish === null) {
						err = new Error(`Dish ${req.params.dishId} not found`);
						err.status = 404;
						return next(err);
					} else {
						err = new Error(
							"Comment " + req.params.commentId + " not found"
						);
						err.status = 404;
						return next(err);
					}
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then(
				(dish) => {
					if (
						dish != null &&
						dish.comments.id(req.params.commentId) != null
					) {
						if (req.body.rating) {
							dish.comments.id(req.params.commentId).rating =
								req.body.rating;
						}
						if (req.body.comment) {
							dish.comments.id(req.params.commentId).comment =
								req.body.comment;
						}
						dish.save().then(
							(dish) => {
								Dishes.findById(dish._id)
									.populate("comments.author")
									.then((dish) => {
										res.statusCode = 200;
										res.setHeader(
											"Content-Type",
											"application/json"
										);
										res.json(dish);
									});
							},
							(err) => next(err)
						);
					} else if (dish == null) {
						err = new Error(
							"Dish " + req.params.dishId + " not found"
						);
						err.status = 404;
						return next(err);
					} else {
						err = new Error(
							"Comment " + req.params.commentId + " not found"
						);
						err.status = 404;
						return next(err);
					}
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then(
				(dish) => {
					if (
						dish != null &&
						dish.comments.id(req.params.commentId) != null
					) {
						dish.comments.id(req.params.commentId).remove();
						dish.save().then(
							(dish) => {
								Dishes.findById(dish._id)
									.populate("comments.author")
									.then((dish) => {
										res.statusCode = 200;
										res.setHeader(
											"Content-Type",
											"application/json"
										);
										res.json(dish);
									});
							},
							(err) => next(err)
						);
					} else if (dish == null) {
						err = new Error(
							"Dish " + req.params.dishId + " not found"
						);
						err.status = 404;
						return next(err);
					} else {
						err = new Error(
							"Comment " + req.params.commentId + " not found"
						);
						err.status = 404;
						return next(err);
					}
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

module.exports = router;

module.exports = router;
