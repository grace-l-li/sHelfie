import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Landing.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "192850721658-rtiea4puhabg53iaddvb3j0fp455acl8.apps.googleusercontent.com";

const LandingPage = ({ userId, handleLogin, handleLogout }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="container">
        <h1>Welcome to Our App!</h1>
        <p>This is our landing page. You can log in or register a new account to get started.</p>
        <div className="flip-book">
          <div className="page">1</div>
          <div className="page">2</div>
        </div>
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
      </div>
    </GoogleOAuthProvider>
  );
};

export default LandingPage;