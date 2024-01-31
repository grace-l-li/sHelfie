import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../modules/UserCard.js";
import "../../utilities.css";
import "./SearchFriends.css";
import { get } from "../../utilities.js";

const FriendSearch = (props) => {
  const [search, setSearch] = useState("");
  const [friendData, setFriendData] = useState([]);
  // const navigate = useNavigate();

  const searchFriend = (evt) => {
    // How to display? In database you have to query exact name/username/etc.
    if (evt.key === "Enter") {
      get("/api/username", { username: search })
        .then(({ users }) => {
          console.log(users);
          setFriendData(users);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="header">
        <div className="row2">
          <h2>Find Your Friends</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Friend's Username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchFriend}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {search !== "" && friendData !== undefined && (
        <div className="card-container">{<UserCard friends={friendData} />}</div>
      )}
    </>
  );
};
export default FriendSearch;
