import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";
import shelfieLogo from "../modules/ShelfieLogo.svg";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "454439898905-2ih7o3uj4tvlg6im1oecb4ipfmjg0i9t.apps.googleusercontent.com";

const LandingPage = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <div class="Landing-Page">
        <div class="container">
          <div class="content">
            <ul>
              <li>
                <div class="book">
                  <ul class="front">
                    <li>
                      <div class="frontcover">
                        <h1 class="welcome-text">Welcome to</h1>
                        <img src={shelfieLogo} alt="Logo" className="logo" />
                        <h4 class="front-subtext">Written by Grace Li, Franklin Nguyen,</h4>
                        <h4 class="front-subtext"> and Dannell Lopez</h4>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                  <ul class="page">
                    <li />
                    <li>
                      <div className="login-button-container">
                        <h4 class="start-text">Start your story today:</h4>
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
                  <ul class="back">
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
