import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import NavBar from "../modules/NavBar";
import tableDrawing from "../modules/Table.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import boxDrawing from "../modules/Box.svg";
import blankProfile from "../modules/BlankProfile.svg";
import pictureFrame from "../modules/PictureFrame.svg";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="outermost-flex">
        <div className="left-flex">
          <div className="Profile-container">
            <div className="Profile-details">
              <h1 className="Profile-name">{props.userData.name}</h1>
              <div className="Friends-container">
                <h3 className="Friends-style"> Friends </h3>
                <h3 className="Friends-style"> Following </h3>
              </div>
              <div className="Friends-container">
                <h3 className="Friends-style"> {props.userData.num_followers} </h3>
                <h3 className="Friends-style"> {props.userData.num_following} </h3>
              </div>
              <h4 className="Profile-bio">{props.userData.bio}</h4>
            </div>
            <div className="Profile-image-container">
              <img src={props.userData.picture} alt="Profile Picture" className="Profile-image" />
              <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" />
              <button className="edit-profile-btn dark-btn">edit profile</button>
            </div>
          </div>
          <div className="bottomleft-flex">
            {/* Box Link */}
            <a href="/tbr/" className="box-link">
              <img src={boxDrawing} alt="Box" />
              <button className="white-btn subpage-link">to be read</button>
            </a>

            {/* Table Link */}
            <a href="/curr/" className="table-link">
              <img src={tableDrawing} alt="Table" />
              <button className="white-btn subpage-link">currently reading</button>
            </a>
          </div>
        </div>
        <div className="right-flex">
          <a href="/read/" className="shelf-link">
            <img src={shelfDrawing} alt="Shelf" />
          </a>
          <a href="/read/" className="shelf-link">
            <button className="white-btn shelf-shift">read</button>
          </a>
          <button className="light-btn add-book-btn">add book</button>
        </div>
        <div className="Profile-floor" />
        <div className="Profile-background" />
      </div>
    </>
  );
};

export default Profile;
