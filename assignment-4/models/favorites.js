const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
	{
		FavoriteId: mongoose.Schema.Types.ObjectId,
		dishId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

var Favorites = mongoose.model("Favorites", favoriteSchema);
module.exports = Favorites;
