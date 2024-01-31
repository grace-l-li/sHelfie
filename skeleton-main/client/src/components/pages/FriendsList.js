import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../modules/UserCard.js";
import "../../utilities.css";
import "./SearchFriends.css";
import { get } from "../../utilities.js";
import "./subpage.css";

const FriendList = (props) => {
  const [frData, setFrData] = useState([]);

  useEffect(() => {
    const fetchFrList = async () => {
      if (props.user.friends && props.user.friends.length > 0) {
        try {
          const friendPromises = props.user.friends.map((userId) =>
            get("/api/userFromId", { userId })
          );
          const friendsResponses = await Promise.all(friendPromises);
          const friends = friendsResponses.map((response) => response.user);
          setFrData(friends);
        } catch (error) {
          console.error("Failed to fetch friends:", error);
        }
      }
    };

    fetchFrList();
  }, [props.user.friends]); // Add props.user.friends as a dependency

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
      <div className="card-container">{<UserCard friends={frData} />}</div>
    </>
  );
};
export default FriendList;
