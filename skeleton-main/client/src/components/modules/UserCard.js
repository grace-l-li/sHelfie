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
        <a href={`/profile/${friend.username}`}>
          <div key={index} className="userCard-container">
            <div className="img-flex">
              <img src={friend.picture} alt="Profile" />
            </div>
            <div className="username-container">{friend.username}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default UserCard;
