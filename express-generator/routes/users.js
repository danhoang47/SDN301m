var express = require("express");
var router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const authenticate = require("../middlewares/authenticate");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
	const { username, password } = req.body;
	User.register(new User({ username }), password, (err, user) => {
		if (err) {
			res.statusCode = 500;
			res.setHeader("Content-Type", "application/json");
			res.json({ err: err });
		} else {
			passport.authenticate("local")(req, res, () => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({
					success: true,
					status: "Registration Successful!",
				});
			});
		}
	});
});

router.post("/login", passport.authenticate("local"), (req, res) => {
	const token = authenticate.getToken({ _id: req.user._id });
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.json({
		success: true,
		token: token,
		status: "You are successfully logged in!",
	});
});

module.exports = router;
