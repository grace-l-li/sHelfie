import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NavBar from "./modules/NavBar.js";
//import LoginButton from "./modules/Login.js";
//import LogoutButton from "./modules/Logout.js";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Landing from "./pages/Landing.js";
import Curr from "./pages/curr.js";
import TBR from "./pages/tbr.js";
import Read from "./pages/read.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      get(`/api/userdata`, { userId: userId }).then((userDataObj) => setUserData(userDataObj));
    }
  }, [userId]);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
    navigate("/profile");
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout").then(() => navigate("/")); // Redirect after logout
  };

  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <NavBar userId={userId} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            <Landing handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route
          path="/home"
          element={<Home handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        />

        <Route
          path="/profile"
          element={
            <Profile
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              userData={userData}
            />
          }
        />

        <Route path="/tbr/" element={<TBR userId={userId} userData={userData} />} />

        <Route path="/curr/" element={<Curr userId={userId} userData={userData} />} />

        <Route path="/read/" element={<Read userId={userId} userData={userData} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
