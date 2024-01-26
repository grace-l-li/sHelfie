const UserData = require("./models/userdata");

const getOrCreateUserData = (user) => {
  return UserData.findOne({ userId: user._id }).then((existingUserData) => {
    if (existingUserData) return existingUserData;

    let unique = true;
    let finalUsername = "";

    while (unique) {
      let rand = Math.floor(Math.random() * 10000);
      let tempUsername = `@${user.name.replace(/\s+/g, "").toLowerCase()}${rand}`;

      UserData.findOne({ username: tempUsername }).then((user) => {
        if (!user) {
          unique = false;
          finalUsername = tempUsername;
        }
      });
    }

    const newUserData = new UserData({
      name: user.name,
      userId: user._id,
      picture: user.picture,
      username: finalUsername,
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
