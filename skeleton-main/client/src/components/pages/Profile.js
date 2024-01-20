import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar";

const Profile = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
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
      <div className="Profile-floor">{/* Content for the lower third container */}</div>

      <div>{userData.num_followers}</div>
    </>
  );
};

export default Profile;
