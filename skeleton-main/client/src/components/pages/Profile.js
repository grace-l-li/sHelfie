import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar";
import tableDrawing from "../modules/Table.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import { get } from "../../utilities";

const Profile = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Profile";
    // get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <h1 className="Profile-name u-textCenter">Jacob Elordi</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              Extra Challenge: Modify catbook to show a personalized description here!
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </div>
      <div className="Profile-floor">
        {/* No Link here yet! */}
        <a href="/curr/" className="table-link">
          <img src={tableDrawing} alt="Table" />
        </a>
      </div>
      <a href="/read/" className="shelf-link">
        <img src={shelfDrawing} alt="Shelf" />
      </a>
    </>
  );
};

export default Profile;
