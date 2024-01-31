const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  picture: String,
  username: String,
  bio: String,
  friend_reqs: [],
  friends: [],
  num_friends: Number,
  tbr: [], // bookId: String
  curr: [],
  read: [],  //{bookId: String, Rating: Number}
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
