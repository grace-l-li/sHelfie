const UserData = require("./models/userdata");

const getOrCreateUserData = (user) => {
  return UserData.findOne({ userId: user._id }).then((existingUserData) => {
    if (existingUserData) return existingUserData;

    const newUserData = new UserData({
      name: user.name,
      userId: user._id,
      picture: user.picture,
      username: "@" + user.name.replace(/\s+/g, "").toLowerCase(),
      bio: "but first, let me take a s(H)elfie ;)",
      followers: [],
      num_followers: 0,
      following: [],
      num_following: 0,
      tbr: [],
      curr: [],
      read: [],
    });

    return newUserData.save();
  });
};

module.exports = { getOrCreateUserData };
