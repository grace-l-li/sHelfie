const UserData = require("./models/userdata");

const getOrCreateUserData = (user) => {
  return UserData.findOne({ id: user._id }).then((existingUserData) => {
    if (existingUserData) return existingUserData;

    const newUserData = new UserData({
      name: user.name,
      id: user._id,
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
