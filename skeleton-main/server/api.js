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
const User = require("./models/user.js");
const Post = require("./models/post.js");
const Comment = require("./models/comment.js");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

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

router.get("/userFromId", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send({ user });
  });
});

router.get("/username", (req, res) => {
  User.find({ username: req.query.username }).then((users) => {
    res.send({ users });
  });
});

router.get("/userFromUsername", async (req, res) => {
  let userId = await auth.getIdFromUsername(req.query.username);
  User.findById(userId).then((user) => {
    res.send({ user });
  });
});

router.post("/edituser", async (req, res) => {
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
    if (user.tbr.find((bookId) => bookId === req.body.bookId)) {
      //check if element in array already
      res.send({ error: "book already added" });
    } else {
      user.tbr.push(req.body.bookId);

      user.save().then(() => {
        res.send({ user });
      });
    }
  });
});

router.post("/curr", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user.curr.find((bookId) => bookId === req.body.bookId)) {
      res.send({ error: "book already added" });
    } else if (user.curr.length === 3) {
      res.send({ error: "You've reached maximum books allowed" });
    } else {
      user.curr.push(req.body.bookId);

      user.save().then(() => {
        res.send({ user });
      });
    }
  });
});

router.post("/read", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user.read.find((book) => book.bookId === req.body.bookId)) {
      res.send({ error: "book already added" });
    } else {
      user.read.push({
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

router.post("/remove", (req, res) => {
  //delete book
  User.findById(req.user._id).then((user) => {
    if (req.body.page === "/tbr") {
      user.tbr = user.tbr.filter((bookId) => bookId !== req.body.bookId);
    } else if (req.body.page === "/curr") {
      user.curr = user.curr.filter((bookId) => bookId !== req.body.bookId);
    } else if (req.body.page === "/read") {
      user.read = user.read.filter((bookId) => bookId !== req.body.bookId);
    }
    user.save().then((updatedUser) => res.send({ updatedUser }));
  });
});

router.get("/posts", (req, res) => {
  let userId = req.query.userId;
  let ids = [userId];
  User.findById(userId).then((user) => ids.concat(user.friends));
  Post.find({ creator_id: { $in: ids } }).then((posts) => res.send(posts));
  //for add friend_ids
});

router.post("/post", (req, res) => {
  const newPost = new Post({
    creator_id: req.user._id,
    creator_username: req.body.creator_username,
    status: req.body.status,
    bookTitle: req.body.bookTitle,
    bookAuthor: req.body.bookAuthor,
    bookImg: req.body.bookImg,
    rating: req.body.rating,
    review: req.body.review,
    likeCount: req.body.likeCount,
  });

  newPost.save().then((post) => res.send(post));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.body.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_username: req.user.username,
    parent: req.body.parent,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));
});

router.post("/like", (req, res) => {
  Post.findById(req.body.postId).then((post) => {
    if (post === null) {
      res.status(400);
      res.send({});
    } else {
      post.likeCount += 1;
      post.save().then((post) => res.send(post));
    }
  });
});

// router.get("/hasliked")
// router.post("/removelike")

router.post("/reqfriend", (req, res) => {
  User.findById(req.body.personId).then((person) => {
    person.friend_reqs.push(req.user._id);
    person.save().then((person) => res.send({ person }));
  });
}); //add my userId to other's friend_reqs

router.post("/cancelreq", (req, res) => {
  User.findById(req.body.personId).then((person) => {
    person.friend_reqs = person.friend_reqs.filter((id) => id !== req.user._id);
    person.save().then((person) => res.send({ person }));
  });
});

router.post("/acceptfriend", (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (!user.friends.find((id) => id === req.body.personId)) {
      user.friends.push(req.body.personId);
      user.num_friends += 1;
    }
    user.save().then();
  }); // maybe need to chain?
  User.findById(req.body.personId).then((person) => {
    if (!person.friends.find((id) => id === req.user._id)) {
      person.friend_reqs = person.friend_reqs.filter((id) => id !== req.user._id);
      person.friends.push(req.user._id);
      person.num_friends += 1;
    }
    person.save().then((person) => res.send({ person }));
  });
}); //remove from their friend_reqs, add to both of our friends

router.post("/declinereq", (req, res) => {
  User.findById(req.body.personId).then((person) => {
    person.friend_reqs = person.friend_reqs.filter((id) => id !== req.user._id);
    person.save().then((person) => res.send({ person }));
  });
}); //remove from their friend_reqs

router.get("/checkfriend", (req, res) => {
  User.findById(req.query.personId).then((person) => {
    res.send({ id: person.friends.find((id) => id === req.user._id) });
  });
});

router.get("/checkreq", (req, res) => {
  User.findById(req.query.personId).then((person) => {
    res.send({ id: person.friend_reqs.find((ids) => ids === req.user._id) });
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
