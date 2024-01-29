import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import NavBar from "../modules/NavBar";
import tableDrawing from "../modules/purpleTable.svg";
import shelfDrawing from "../modules/ShelfDrawing.svg";
import boxDrawing from "../modules/Box.svg";
import blankProfile from "../modules/BlankProfile.svg";
import pictureFrame from "../modules/PictureFrame.svg";

import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";
import "./EditProfile.css";

const Profile = (props) => {
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user) {
      setNewName(props.user.name || "");
      setNewUsername(props.user.username || "");
      setNewBio(props.user.bio || "");
      // setNewPicture(props.user.picture || "");
    }
  }, [props.user]);

  // if (props.user) {
  //   console.log(Object.keys(props.user).length);
  // }
  // if (props.user && Object.keys(props.user).length) {
  //   const saveChanges = () => {
  //     // Prevent default navigation behavior
  //     event.preventDefault();

  //     // Implement save logic here. For example, an HTTP request to your API endpoint:
  //     const updatedUser = {
  //       name: editableName,
  //       username: editableUsername,
  //       bio: editableBio,
  //     };

  //     // Example POST request with fetch API
  //     fetch("/api/user/update", {
  //       method: "POST", // or 'PUT'
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedUser),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Success:", data);
  //         // Optionally, navigate to the profile page or give feedback to the user
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    let sendPicture = newPicture === "" ? props.user.picture : newPicture;
    post("/api/user", {
      name: newName,
      username: newUsername,
      bio: newBio,
      picture: sendPicture,
    }).then((res) => {
      if (!res.error) {
        get(`/api/user`, { userId: props.userId }).then(({ user: userObj }) => {
          if (userObj !== null) {
            props.setUser(userObj);
            navigate("/profile");
            // console.log(JSON.stringify(userObj));
          }
        });
        // props.fetchUser().then(() => {
        // });
      } else {
        alert("username taken");
      }
    });
  };

  return (
    <>
      <div className="emptyNavBar" />
      <div className="outermost-flex">
        <div className="left-flex">
          <div className="topleft-flex"></div>
          <div className="Profile-container">
            <div className="Profile-details">
              <input
                type="text"
                className="Profile-name editable-field"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                maxLength={20}
              />
              <input
                type="text"
                className="Username-style editable-field"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                maxLength={30}
              />
              {/* <h1 className="Profile-name">{props.user.name}</h1> */}
              {/* <h3 className="Username-style">{props.user.username}</h3> */}
              {/* <div className="Friends-container">
                <h3 className="Friends-style"> {props.user.num_followers} Friends </h3>
                <h3 className="Friends-style"> {props.user.num_following} Following </h3>
              </div> */}
              <div className="Profile-bio-container">
                <textarea
                  className="Profile-bio editable-field"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows="4" // This sets the initial visible number of lines in the textarea
                  maxLength={100}
                />
              </div>
              {/* <div className="Profile-bio-container">
                <h4 className="Profile-bio">{props.user.bio}</h4>
              </div> */}
            </div>
            <div className="Profile-image-container">
              <input
                type="text"
                placeholder="Insert new image link"
                className="image-field Profile-bio"
                // className="Username-style editable-field"
                value={newPicture}
                onChange={(e) => setNewPicture(e.target.value)}
              />
              {/* <img src={props.user.picture} alt="Profile Picture" className="Profile-image" /> */}
              {/* <img src={pictureFrame} alt="Picture Frame" className="Picture-frame" /> */}
              <a href="/profile">
                <button className="edit-profile-btn dark-btn" onClick={handleSubmit}>
                  save changes
                </button>
              </a>
            </div>
          </div>
          <div className="bottomleft-flex2">
            {/* Box Link */}
            <a className="box-link">
              <img src={boxDrawing} alt="Box" />
              {/* <button className="white-btn subpage-link">to be read</button> */}
            </a>

            {/* Table Link */}
            <a className="table-link">
              <img src={tableDrawing} alt="Table" />
              {/* <button className="white-btn subpage-link">currently reading</button> */}
            </a>
          </div>
        </div>
        <div className="right-flex">
          <a className="shelf-link2">
            <img src={shelfDrawing} alt="Shelf" />
          </a>
          {/* <button className="light-btn add-book-btn">add book</button> */}
        </div>
        <div className="Profile-floor" />
        <div className="Profile-background" />
      </div>
    </>
  );
};

export default Profile;
