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
  // if (props.user) {
  //   console.log(Object.keys(props.user).length);
  // }
  // if (props.user && Object.keys(props.user).length) {

  useEffect(() => {
    if (props.userId) {
      get(`/api/user`, { userId: props.userId }).then(({ user: userObj }) => {
        if (userObj !== null) {
          props.setUser(userObj);
          // console.log(JSON.stringify(userObj));
        }
      });
    }
  }, [props.userId]);

  return (
    <>
      <div className="outermost-flex">
        <div className="left-flex">
          <div className="topleft-flex"></div>
          <div className="Profile-container">
            <div className="Profile-details">
              <h1 className="Profile-name">{props.user.name}</h1>
              <h3 className="Username-style">@{props.user.username}</h3>
              <div className="Friends-container">
                <h3 className="Friends-style"> {props.user.num_followers} Friends </h3>
                <h3 className="Friends-style"> {props.user.num_following} Following </h3>
              </div>
              <div className="Profile-bio-container">
                <h4 className="Profile-bio">{props.user.bio}</h4>
              </div>
            </div>
            <div className="Profile-image-container">
              <img src={props.user.picture} alt="Profile Picture" className="Profile-image" />
              <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" />
              <a href="/profile/edit">
                <button className="edit-profile-btn dark-btn">edit profile</button>
              </a>
            </div>
          </div>
          <div className="bottomleft-flex">
            {/* Box Link */}
            <a className="box-link">
              <a href="/tbr">
                <img src={boxDrawing} alt="Box" />
              </a>
              <a href="/tbr">
                <button className="white-btn subpage-link">to be read</button>
              </a>
            </a>

            {/* Table Link */}
            <a className="table-link">
              <a href="/curr">
                <img src={tableDrawing} alt="Table" />
              </a>
              <a href="/curr">
                <button className="white-btn subpage-link">currently reading</button>
              </a>
            </a>
          </div>
        </div>
        <div className="right-flex">
          <a href="/read" className="shelf-link">
            <img src={shelfDrawing} alt="Shelf" />
          </a>
          <a href="/read" className="shelf-link">
            <button className="white-btn shelf-shift">read</button>
          </a>

          <a href="/search/" className="add-link">
            <button className="light-btn add-book-btn">add book</button>
          </a>
        </div>
        <div className="Profile-floor" />
        <div className="Profile-background" />
      </div>
    </>
  );
};

export default Profile;
