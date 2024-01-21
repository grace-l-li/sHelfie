import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "192850721658-rtiea4puhabg53iaddvb3j0fp455acl8.apps.googleusercontent.com";

const LandingPage = ({ userId, handleLogin, handleLogout }) => {
  return (
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
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}

      <body>
        <div class="container">
          <div class="content">
            <ul>
              <li>
                <div class="book">
                  <ul class="front">
                    <li>
                      <div class="frontcover">
                        <p class="title">Welcome to shelfie!</p>
                        <h2 class="heading">A place to share your favorite books</h2>
                        <p class="sub-title">
                          shelfie is a place to share your favorite books with your friends. You can
                          create a profile, add books to your shelf, and see what your friends are
                          reading.{" "}
                        </p>
                        <div class="book-icon">
                          <img src=".png" alt=""></img>
                        </div>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                  <ul class="page">
                    <li></li>
                    <li>
                      <a href="#" class="btn">
                        {" "}
                        Login
                      </a>
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
      </body>
    </GoogleOAuthProvider>
  );
};

export default LandingPage;
