const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  name: String,
  userId: String, //_id of user that this data belongs to
  picture: String,
  username: String,
  bio: String,
  followers: [],
  num_followers: Number,
  following: [],
  num_following: Number,
  tbr: [],
  curr: [],
  read: [],
});

// compile model from schema
module.exports = mongoose.model("userdata", UserDataSchema);
