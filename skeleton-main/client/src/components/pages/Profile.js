import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar";
import tableDrawing from "../modules/Table.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";

const Profile = () => {
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
          {/* <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
          <CatHappiness catHappiness={catHappiness} /> */}
          {/* </div> */}
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </div>
      <div className="Profile-floor">
        {/* No Link here yet! */}
        <a href="/your-link" className="table-link">
          <img src={tableDrawing} alt="Table" />
        </a>
      </div>
      <a href="/your-link-for-shelf" className="shelf-link">
        <img src={shelfDrawing} alt="Shelf" />
      </a>
    </>
  );
};

export default Profile;
