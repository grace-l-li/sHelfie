import React, { useState } from "react";
// import BookModal from "./BookModal.js";
import "../pages/SearchBooks.js";
import "./UserCard.css";

const UserCard = ({ friends, user }) => {
  console.log(friends);
  const [userItem, setUserItem] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {friends.map((friend, index) => (
        <div key={index}>
          <a className="userCard-container" href={`/profile/${friend.username}`}>
            <img src={friend.picture} alt="Profile" />
            <div className="username-container">@{friend.username}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
