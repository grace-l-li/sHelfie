const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user.js");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "454439898905-2ih7o3uj4tvlg6im1oecb4ipfmjg0i9t.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

const getIdFromUsername = async (username) => {
  const user = await User.findOne({ username: username });
  if (user) {
    return user._id;
  } else {
    return undefined;
  }
};

// gets user from DB, or makes a new account if it doesn't exist yet
const getOrCreateUser = (user) => {
  // the "sub" field means "subject", which is a unique identifier for each user

  return User.findOne({ googleid: user.sub }).then(async (existingUser) => {
    if (existingUser) return existingUser;

    let foundUserId = true;
    let tempUsername = "";
    let finalUsername = "";

    while (!(foundUserId === undefined)) {
      let rand = Math.floor(Math.random() * 10000);
      tempUsername = `${user.name.replace(/\s+/g, "").toLowerCase()}${rand}`;

      foundUserId = await getIdFromUsername(tempUsername);
      if (foundUserId === undefined) {
        finalUsername = tempUsername;
      }
    }

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      picture: user.picture,
      username: finalUsername,
      bio: "but first, let me take a s(H)elfie ;)",
      friend_reqs: [],
      friends: [],
      num_friends: 0,
      tbr: [], //[{bookId: String}]
    });
    return newUser.save();
  });
};

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}, stack: ${err.stack}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
  getIdFromUsername,
};
