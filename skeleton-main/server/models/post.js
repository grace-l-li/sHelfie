const mongoose = require("mongoose");

//define a story schema for the database
const PostSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  bookTitle: String,
  rating: Number, //-1 if tbr or current
  review: String,
});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
