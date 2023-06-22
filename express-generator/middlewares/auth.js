function auth(req, res, next) {
	if (!req.user) {
		const err = new Error("You are not authenticated!");
		err.status = 403;
		next(err);
	} else {
		next();
	}
}

module.exports = auth;
