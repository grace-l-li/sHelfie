import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";
import axios from "axios";
import NavBar from "./modules/NavBar.js";
//import LoginButton from "./modules/Login.js";
//import LogoutButton from "./modules/Logout.js";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import EditProfile from "./pages/EditProfile.js";
import Landing from "./pages/Landing.js";
import Curr from "./pages/curr.js";
import TBR from "./pages/tbr.js";
import Read from "./pages/read.js";
import "../utilities.css";
import SearchBooks from "./pages/search.js";
import SearchFriends from "./pages/SearchFriends.js";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
        if (location.pathname === "/") {
          navigate("/profile");
        }
      } else {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    });
  }, [location]);

  const fetchUser = () => {
    if (userId) {
      get(`/api/user`, { userId: userId }).then(({ user: userObj }) => {
        if (userObj !== null) {
          setUser(userObj);
          return userObj;
          // console.log(JSON.stringify(userObj));
        }
      });
    }
  };

  useEffect(() => {
    fetchUser();
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
  const isEditProfile = location.pathname === "/profile/edit";

  return (
    <>
      {!isLandingPage && !isEditProfile && <NavBar userId={userId} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route
          path="/profile/edit"
          element={
            <EditProfile
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route path="/tbr" element={<TBR userId={userId} user={user} />} />

        <Route path="/curr" element={<Curr userId={userId} user={user} />} />

        <Route path="/read" element={<Read userId={userId} user={user} />} />

        <Route
          path="/search-books"
          element={
            <SearchBooks handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />

        <Route
          path="/search-friends"
          element={
            <SearchFriends handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
