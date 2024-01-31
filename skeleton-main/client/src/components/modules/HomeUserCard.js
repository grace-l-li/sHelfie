import React, { useState } from "react";
import "./HomeUserCard.css";
import check from "./Check.svg";
import x from "./X.svg";

const HomeUserCard = ({ friends, user, requests }) => {
  console.log(friends);
  const [userItem, setUserItem] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {friends.map((friend, index) => (
        <div key={index}>
          <div className="home-userCard-container">
            <img src={friend.picture} alt="Profile" className="pf-friend" />
            <div className="home-username-container">
              <a href={`/profile/${friend.username}`}>@{friend.username}</a>
            </div>
            {requests && (
              <div className="checks">
                <img src={check} alt="Checkmark" className="request-icons" />
                <img src={x} alt="Xmark" className="request-icons" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeUserCard;
