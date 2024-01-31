import React, { useState } from "react";
// import BookModal from "./BookModal.js";
import "../pages/SearchBooks.js";
import "./UserCard.css";

const UserCard = (props) => {
  const [userCards, setUserCards] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {props.userCards.map((post, index) => (
        <div key={index} className="userCard-container">
          <div className="img-flex">
            <img src={props.user.picture} alt="Profile" />
          </div>
          <div className="username-container">{props.user.username}</div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
