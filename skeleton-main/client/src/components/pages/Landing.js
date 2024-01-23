import React from "react";
import { GoogleOAuthProvider, GoogleLogin, GoogleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "192850721658-rtiea4puhabg53iaddvb3j0fp455acl8.apps.googleusercontent.com";

const LandingPage = ({ userId, handleLogin, handleLogout }, props) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* {userId ? (
        <button
          onClick={() => {
            GoogleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )} */}

      <div class="Landing-Page">
        <div class="container">
          <div class="content">
            <ul>
              <li>
                <div class="book">
                  <ul class="front">
                    <li>
                      <div class="frontcover">
                        <p class="title">Welcome to shelife!</p>
                        <h2 class="heading">Share your book shelves!</h2>
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
                      <div>
                        {props.userId ? (
                          <googleLogout
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={props.handleLogout}
                            onFailure={(err) => console.log(err)}
                            className="NavBar-link NavBar-login"
                          />
                        ) : (
                          <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={props.handleLogin}
                            onFailure={(err) => console.log(err)}
                            className="NavBar-link NavBar-login"
                          />
                        )}
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
    </GoogleOAuthProvider>
  );
};

export default LandingPage;
