const mongoose = require("mongoose");

//define a story schema for the database
const PostSchema = new mongoose.Schema({
  creator_id: String,
  creator_username: String,
  status: String,
  bookTitle: String,
  bookImg: String,
  bookAuthor: String,
  rating: Number, //-1 if tbr or current
  // review: String,
  likeCount: Number,
});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
