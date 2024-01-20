const mongoose = require("mongoose");

//define a story schema for the database
const BooksSchema = new mongoose.Schema({});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
