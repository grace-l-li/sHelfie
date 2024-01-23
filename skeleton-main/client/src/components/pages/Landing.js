import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";

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
                        <p class="title">Welcome to s(H)elfie!</p>
                        <h2 class="heading">Share your bookshelves!</h2>
                        <p class="sub-title"> </p>
                        <div class="book-icon">
                          <img src=".png" alt=""></img>
                        </div>
                        <div class="writer">
                          <img src=".png" alt=""></img>
                          <p>
                            <i>Written by </i>Dannell, Grace, and Franklin
                          </p>
                        </div>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                  <ul class="page">
                    <li />
                    <li>
                      {/* <a href="#" class="btn">
                        Login With Google
                      </a> */}
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
