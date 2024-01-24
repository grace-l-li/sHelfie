import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import axios from "axios";
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
import Search from "./pages/search.js";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

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
    post("/api/logout");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        }
      />
      <Route
        path="/home"
        element={
          <Home
            path="home/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }
      />

      <Route
        path="/profile"
        element={
          <Profile
            path="/profile"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }
      />

      <Route
        path="/read"
        element={
          <Read
            path="/read"
            // handleLogin={handleLogin}
            // handleLogout={handleLogout}
            // userId={userId}
          />
        }
      />

      <Route
        path="/curr"
        element={
          <Curr
            path="/curr"
            // handleLogin={handleLogin}
            // handleLogout={handleLogout}
            // userId={userId}
          />
        }
      />

      <Route
        path="/tbr"
        element={
          <TBR
            path="/tbr"
            // handleLogin={handleLogin}
            // handleLogout={handleLogout}
            // userId={userId}
          />
        }
      />

      <Route
        path="/search"
        element={
          <Search
            path="/search"
            //handleLogin={handleLogin}
            //handleLogout={handleLogout}
            //userId={userId}
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
