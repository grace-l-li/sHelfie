const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  name: String,
  id: String, //_id of user that this data belongs to
  bio: String,
  followers: [],
  num_followers: Number,
  following: [],
  TBR: [],
  current: [],
  finished: [],
});

// compile model from schema
module.exports = mongoose.model("userdata", UserDataSchema);
