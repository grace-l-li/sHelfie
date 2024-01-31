import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tableDrawing from "../modules/purpleTable.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import boxDrawing from "../modules/Box.svg";
import blankProfile from "../modules/BlankProfile.svg";
import pictureFrame from "../modules/PictureFrame.svg";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";

const OtherProfile = () => {
  let { username } = useParams();

  const [person, setPerson] = useState({});

  useEffect(() => {
    get("/api/userFromUsername", { username: username }).then((res) => {
      setPerson(res.user);
      setProfileImage(res.user.picture);
    });
  }, []);

  const [profileImage, setProfileImage] = useState(person.picture || blankProfile);

  const handleImageError = () => {
    setProfileImage(blankProfile);
  };

  useEffect(() => {
    setProfileImage(person.picture || blankProfile);
  }, []);

  return (
    <>
      <div className={"outermost-flex"}>
        <div className="left-flex">
          <div className="topleft-flex"></div>
          <div className="Profile-container">
            <div className="Profile-details">
              <h1 className="Profile-name">{person.name}</h1>
              <h3 className="Username-style">@{person.username}</h3>
              <div className="Friends-container">
                <h3 className="Friends-style"> {person.num_followers} Friends </h3>
                <h3 className="Friends-style"> {person.num_following} Following </h3>
              </div>
              <div className="Profile-bio-container">
                <h4 className="Profile-bio">{person.bio}</h4>
              </div>
            </div>
            <div className="Profile-image-container">
              <img
                src={profileImage}
                alt="Profile Picture"
                className="Profile-image"
                onError={handleImageError} // Add the onError handler here
              />
              <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" />
              <div>
                {" "}
                {/* Add onClick = {() => {handleFollow()}}*/}
                <button className="edit-profile-btn dark-btn">Follow</button>{" "}
                {/*Conditionally render if already following*/}
              </div>
            </div>
          </div>
          <div className="bottomleft-flex">
            {/* Box Link */}
            <div className="box-link">
              <a href={`/tbr/${username}`}>
                <img src={boxDrawing} alt="Box" />
              </a>
              <a href={`/tbr/${username}`}>
                <button className="white-btn subpage-link">to be read</button>
              </a>
            </div>

            {/* Table Link */}
            <div className="table-link">
              <a href={`/curr/${username}`}>
                <img src={tableDrawing} alt="Table" />
              </a>
              <a href={`/curr/${username}`}>
                <button className="white-btn subpage-link">currently reading</button>
              </a>
            </div>
          </div>
        </div>
        <div className="right-flex">
          <a href={`/read/${username}`} className="shelf-link">
            <img src={shelfDrawing} alt="Shelf" />
          </a>
          <a href={`/read/${username}`} className="shelf-link">
            <button className="white-btn shelf-shift">read</button>
          </a>
        </div>
        <div className="Profile-floor" />
        <div className="Profile-background" />
      </div>
    </>
  );
};

export default OtherProfile;