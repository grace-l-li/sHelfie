import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../modules/BookCard.js";
import "../../utilities.css";

const FriendSearch = (props) => {
  const [search, setSearch] = useState("");
  const [friendData, setfriendData] = useState([]);
  // const navigate = useNavigate();

  const searchFriend = (evt) => {
    // How to display? In database you have to query exact name/username/etc.
    if (evt.key === "Enter" || evt.key === " ") {
      get("/api/user", { userId: props.userId }).then((user) => {
        // setfriendData(user);
      });
      // .then((res) => setbookData(res.data.items))
      // .catch((err) => console.log(err));
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
              placeholder="Enter Your Friend's Name or Username"
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

      {/* {search !== "" && friendData !== undefined && (
        <div className="container">{<UserCard book={bookData} />}</div>
      )} */}
    </>
  );
};
export default FriendSearch;
