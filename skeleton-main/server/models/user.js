const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  picture: String,
  username: String,
  bio: String,
  follow_reqs: [],
  followers: [],
  num_followers: Number,
  following: [],
  num_following: Number,
  tbr: [],
  curr: [],
  read: [],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
