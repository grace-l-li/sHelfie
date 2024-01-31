import React, { useState, useEffect } from "react";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "../pages/Home.css";
import HomeUserCard from "../modules/HomeUserCard.js";

const Friends = ({ friends }) => {
  return (
    <div>
      {friends.map((friend, index) => (
        <HomeUserCard friend={friend.user} request={false} index={index} />
      ))}
    </div>
  );
};

export default Friends;
