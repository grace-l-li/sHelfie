import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";
import shelfieLogo from "../modules/ShelfieLogo.svg";
import wood from "../modules/Wood.svg";

//TODO: REPLACE WITH YOUR OWN CLIENT_D
const GOOGLE_CLIENT_ID = "454439898905-2ih7o3uj4tvlg6im1oecb4ipfmjg0i9t.apps.googleusercontent.com";

const LandingPage = ({ handleLogin, handleLogout, userId, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length !== 0 && userId !== undefined) {
      // Sometimes when you log in new users it stays stuck on the log in page
      // What this useEffect is doing is essentially redirecting nonempty users to their profile
      // We also had a bug such that log out spazzed between the prof and log out page but in order to fix this
      // we check for undefined user ids which change instantenously rather than just a nonempty user
      navigate("/profile");
    }
  }, [userId, user]);

  return (
    <>
      <div className="content">
        <ul>
          <li>
            <div className="wood">
              <img src={wood} />
            </div>
            <div className="book">
              <ul className="front">
                <li>
                  <div className="frontcover">
                    <h1 className="welcome-text">Welcome to</h1>
                    <img src={shelfieLogo} alt="Logo" className="logo" />
                    <h4 className="front-subtext">Written by Grace Li, Franklin Nguyen,</h4>
                    <h4 className="front-subtext"> and Dannell Lopez</h4>
                  </div>
                </li>
                <li></li>
              </ul>
              <ul className="page">
                <li />
                <li>
                  <div className="login-button-container">
                    <h4 className="start-text">Start your story today:</h4>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                      {userId ? (
                        <button
                          onClick={() => {
                            googleLogout();
                            handleLogout();
                          }}
                        >
                          Logout
                        </button>
                      ) : (
                        <GoogleLogin
                          clientId={GOOGLE_CLIENT_ID}
                          buttonText="Login with Google"
                          onSuccess={handleLogin}
                          onError={(err) => console.log(err)}
                          className="NavBar-link NavBar-login"
                        />
                      )}
                    </GoogleOAuthProvider>
                  </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className="back">
                <li></li>
                <li></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LandingPage;
