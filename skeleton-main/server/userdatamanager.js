const UserData = require("./models/userdata");

const getOrCreateUserData = (user) => {
  return UserData.findOne({ googleid: user.sub }).then((existingUserData) => {
    if (existingUserData) return existingUserData;

    const newUserData = new UserData({
      name: user.name,
      googleid: user.sub,
      bio: "",
      followers: [],
      num_followers: 0,
      following: [],
      TBR: [],
      current: [],
      finished: [],
    });

    return newUserData.save();
  });
};

module.exports = { getOrCreateUserData };
