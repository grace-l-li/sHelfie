const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  name: String,
  userId: String, //_id of user that this data belongs to
  // pfp: Image,
  bio: String,
  followers: [],
  num_followers: Number,
  following: [],
  num_following: Number,
  TBR: [],
  current: [],
  finished: [],
});

// compile model from schema
module.exports = mongoose.model("userdata", UserDataSchema);
