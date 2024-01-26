const UserData = require("./models/userdata");

const getOrCreateUserData = async (user) => {
  return UserData.findOne({ userId: user._id }).then(async (existingUserData) => {
    if (existingUserData) return existingUserData;

    let unique = true;
    let finalUsername = "";

    console.log("here");

    while (unique) {
      let rand = Math.floor(Math.random() * 10000);
      let tempUsername = `@${user.name.replace(/\s+/g, "").toLowerCase()}${rand}`;

      const userData = await UserData.findOne({ username: tempUsername });
      if (!userData) {
        unique = false;
        finalUsername = tempUsername;
      }
    }
    console.log(finalUsername);

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
