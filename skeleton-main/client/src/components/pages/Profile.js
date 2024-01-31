import React, { useState, useEffect } from "react";
import tableDrawing from "../modules/purpleTable.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import boxDrawing from "../modules/Box.svg";
import blankProfile from "../modules/BlankProfile.svg";
import pictureFrame from "../modules/PictureFrame.svg";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  useEffect(() => {
    if (props.userId) {
      get("/api/user", { userId: props.userId }).then(({ user: userObj }) => {
        if (userObj !== null) {
          props.setUser(userObj);
        }
      });
    }
  }, [props.userId]);

  useEffect(() => {
    if (props.justLoggedIn) {
      setAnimationClass("zoom-out");
      // props.setJustLoggedIn(false);
      setTimeout(() => {
        props.setJustLoggedIn(false);
      }, 3000);
    }
  }, [props.justLoggedIn]);

  const [profileImage, setProfileImage] = useState(props.user.picture || blankProfile);
  // const [playAnimation, setPlayAnimation] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const handleImageError = () => {
    setProfileImage(blankProfile);
  };

  useEffect(() => {
    setProfileImage(props.user.picture || blankProfile);
  }, [props.userId, props.user.picture]);

  useEffect(() => {
    return () => {
      setAnimationClass("");
    };
  }, []);

  return (
    <>
      <div className={`outermost-flex ${props.justLoggedIn ? "zoom-out" : ""}`}>
        <div className="left-flex">
          <div className="topleft-flex"></div>
          <div className="Profile-container">
            <div className="Profile-details">
              <h1 className="Profile-name">{props.user.name}</h1>
              <h3 className="Username-style">@{props.user.username}</h3>
              <div className="Friends-container">
                <a href="/profile/friends">
                  <h3 className="Friends-style"> {props.user.num_friends} Friend(s) </h3>
                </a>
              </div>
              <div className="Profile-bio-container">
                <h4 className="Profile-bio">{props.user.bio}</h4>
              </div>
            </div>
            <div className="Profile-image-container">
              <img
                src={profileImage}
                alt="Profile Picture"
                className="Profile-image"
                onError={handleImageError} // Add the onError handler here
              />{" "}
              <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" />
              <a href="/profile/edit">
                <button className="edit-profile-btn dark-btn">edit profile</button>
              </a>
            </div>
          </div>
          <div className="bottomleft-flex">
            {/* Box Link */}
            <div className="box-link">
              <a href="/tbr">
                <img src={boxDrawing} alt="Box" />
              </a>
              <a href="/tbr">
                <button className="white-btn subpage-link">want to read</button>
              </a>
            </div>

            {/* Table Link */}
            <div className="table-link">
              <a href="/curr">
                <img src={tableDrawing} alt="Table" />
              </a>
              <a href="/curr">
                <button className="white-btn subpage-link">currently reading</button>
              </a>
            </div>
          </div>
        </div>
        <div className="right-flex">
          <a href="/read" className="shelf-link">
            <img src={shelfDrawing} alt="Shelf" />
          </a>
          <a href="/read" className="shelf-link">
            <button className="white-btn shelf-shift">read</button>
          </a>

          <a href="/search-books" className="add-link">
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
