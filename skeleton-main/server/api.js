/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const user = require("./models/user");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send({ user });
  });
});

router.post("/user", async (req, res) => {
  let foundUserId = await auth.getIdFromUsername(req.body.username);

  if (foundUserId === undefined || foundUserId == req.user._id) {
    User.findById(req.user._id).then((user) => {
      user.name = req.body.name;
      user.username = req.body.username;
      user.bio = req.body.bio;
      user.picture = req.body.picture;

      user.save().then(() => {
        res.send({ user });
      });
    });
  } else {
    res.send({ error: "Username already taken" });
  }
});

router.post("/tbr", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user.tbr.find((book) => book.bookId === req.body.bookId)) {
      //check if element in array already
      res.send({ error: "book already added" });
    } else {
      user.tbr.push({
        bookId: req.body.bookId,
        rating: req.body.rating,
        review: req.body.review,
      });

      user.save().then(() => {
        res.send({ user });
      });
    }
  });
});

router.post("/curr", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user.tbr.find((book) => book.bookId === req.body.bookId)) {
      res.send({ error: "book already added" });
    } else {
      user.curr.push({
        bookId: req.body.bookId,
        rating: req.body.rating,
        review: req.body.review,
      });

      user.save().then(() => {
        res.send({ user });
      });
    }
  });
});

router.post("/read", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user.tbr.find((book) => book.bookId === req.body.bookId)) {
      user.read.push({
        bookId: req.body.bookId,
        rating: req.body.rating,
        review: req.body.review,
      });

      user.save().then(() => {
        res.send({ user });
      });
    } else {
      res.send({ error: "book already added" });
    }
  });
});

router.post("/remove", (req, res) => {
  //delete book
  User.findById(req.user._id).then((user) => {
    // user.tbr.
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
