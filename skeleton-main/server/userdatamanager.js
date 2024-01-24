const UserData = require("./models/userdata");

const getOrCreateUserData = (user) => {
  console.log(JSON.stringify(user));
  return UserData.findOne({ userId: user._id }).then((existingUserData) => {
    if (existingUserData) return existingUserData;

    const newUserData = new UserData({
      name: user.name,
      userId: user._id,
      // pfp: profileIcon,
      bio: "",
      followers: [],
      num_followers: 0,
      following: [],
      num_following: 0,
      TBR: [],
      current: [],
      finished: [],
    });

    return newUserData.save();
  });
};

module.exports = { getOrCreateUserData };
