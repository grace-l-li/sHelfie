import React, { useState, useEffect } from "react";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "../pages/Home.css";
import HomeUserCard from "../modules/HomeUserCard.js";

const FriendRequests = ({ friends }) => {
  return (
    <div>
      {friends.map((friend, index) => (
        <HomeUserCard friend={friend.user} request={true} index={index} />
      ))}
    </div>
  );
};

export default FriendRequests;
