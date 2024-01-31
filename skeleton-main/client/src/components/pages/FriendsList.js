import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../modules/UserCard.js";
import "../../utilities.css";
import "./SearchFriends.css";
import { get } from "../../utilities.js";
import "./subpage.css";

const FriendList = (props) => {
  const [friendData, setFriendData] = useState([]);

  return (
    <>
      <a href="/profile">
        <button className="light-btn back-btn">Back</button>
      </a>

      <div className="header">
        <div className="row2">
          <h2>{props.user.name}'s Friends</h2>
        </div>
      </div>
      {friendData !== undefined && (
        <div className="card-container">{<UserCard friends={friendData} />}</div>
      )}
    </>
  );
};
export default FriendList;
