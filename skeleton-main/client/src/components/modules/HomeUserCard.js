import React, { useState } from "react";
import "./HomeUserCard.css";
import check from "./Check.svg";
import x from "./X.svg";

import { post } from "../../utilities.js";

const HomeUserCard = ({ friend, request, index }) => {
  const [exist, setExist] = useState(true);

  const handleAccept = (friendId) => {
    post("/api/acceptfriend", { personId: friendId }).then((res) => {
      if (!res.error) {
        setExist(false);
      }
    });
  };

  const handleDecline = (friendId) => {
    post("/api/declinereq", { personId: friendId }).then((res) => {
      if (!res.error) {
        setExist(false);
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div key={index}>
        {exist && (
          <div className="home-userCard-container">
            <img src={friend.picture} alt="Profile" className="pf-friend" />
            <div className="home-username-container">
              <a href={`/profile/${friend.username}`}>@{friend.username}</a>
            </div>
            {request && (
              <div className="checks">
                <div onClick={() => handleAccept(friend._id)}>
                  <img src={check} alt="Checkmark" className="request-icons" />
                </div>
                <div onClick={() => handleDecline(friend._id)}>
                  <img src={x} alt="Xmark" className="request-icons" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeUserCard;
