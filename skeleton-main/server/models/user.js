const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: String,
  followers: [],
  num_followers: Number,
  following: [],
  TBR: [],
  current: [],
  finished: [],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
