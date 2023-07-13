var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Favorites",
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
