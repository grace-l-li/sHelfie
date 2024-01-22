import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar";

import tableDrawing from "../modules/Table.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import boxDrawing from "../modules/Box.svg";
import blankProfile from "../modules/BlankProfile.svg";
import pictureFrame from "../modules/PictureFrame.svg";
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

      <div className="Profile-container">
        <div className="Profile-details">
          <h1 className="Profile-name">Jacob Elordi</h1>
          <div className="Friends-container">
            <h3 className="Friends-style"> Friends </h3>
            <h3 className="Friends-style"> Following </h3>
          </div>
          <div className="Friends-container">
            <h3 className="Friends-style"> 10 </h3>
            <h3 className="Friends-style"> 5 </h3>
          </div>
          <h4 className="Profile-bio">full time actor, part time reader ;)</h4>
        </div>
        <div className="Profile-image-container">
          <img src={blankProfile} alt="Profile Picture" className="Profile-image" />
          <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" />
          <button>edit profile</button>
        </div>
      </div>

      <div className="Profile-floor" />

      <div className="flex-container">
        <a href="/tbr/" className="box-link">
          <img src={boxDrawing} alt="Box" />
          <div className="subpage-link">to be read</div>
        </a>
        <a href="/curr/" className="table-link">
          <img src={tableDrawing} alt="Table" />
          <div className="subpage-link">currently reading</div>
        </a>
        <a href="/read/" className="shelf-link">
          <img src={shelfDrawing} alt="Shelf" />
          <div className="subpage-link">read</div>
        </a>
      </div>
    </>
  );
};

export default Profile;
