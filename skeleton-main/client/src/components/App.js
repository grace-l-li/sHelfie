import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";
import NavBar from "./modules/NavBar.js";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import EditProfile from "./pages/EditProfile.js";
import Landing from "./pages/Landing.js";
import Curr from "./pages/curr.js";
import TBR from "./pages/tbr.js";
import Read from "./pages/read.js";
import "../utilities.css";
import SearchBooks from "./pages/SearchBooks.js";
import SearchFriends from "./pages/SearchFriends.js";
import FriendsList from "./pages/FriendsList.js";
import ProfileOther from "./pages/ProfileOther.js";
import CurrOther from "./pages/CurrOther.js";
import TbrOther from "./pages/TbrOther.js";
import ReadOther from "./pages/ReadOther.js";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const [justLoggedIn, setJustLoggedIn] = useState(false);
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
    console.log(userId);

    if (userId) {
      get("/api/user", { userId: userId }).then(({ user: userObj }) => {
        if (userObj !== null) {
          setUser(userObj);
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
      setJustLoggedIn(true);
      navigate("/profile");
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout").then(() => navigate("/")); // Redirect after logout
    setJustLoggedIn(false);
  };

  const isLandingPage = location.pathname === "/";
  const pathsWithoutNavBar = ["/profile/friends", "/profile/edit", "/curr", "/tbr", "/read"];
  const shouldShowNavBar = !pathsWithoutNavBar.includes(location.pathname);

  console.log(user);

  return (
    <>
      {!isLandingPage && shouldShowNavBar && <NavBar userId={userId} handleLogout={handleLogout} />}
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
              justLoggedIn={justLoggedIn}
              setJustLoggedIn={setJustLoggedIn}
            />
          }
        />
        <Route
          path="/profile/friends/"
          element={
            <FriendsList
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
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

        <Route path="/tbr" element={<TBR userId={userId} user={user} setUser={setUser} />} />

        <Route path="/curr" element={<Curr userId={userId} user={user} setUser={setUser} />} />

        <Route path="/read" element={<Read userId={userId} user={user} setUser={setUser} />} />

        <Route
          path="/search-books"
          element={
            <SearchBooks
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route
          path="/search-friends"
          element={
            <SearchFriends
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route path="/profile/:username" element={<ProfileOther />} />

        <Route path="/tbr/:username" element={<TbrOther />} />
        <Route path="/curr/:username" element={<CurrOther />} />
        <Route path="/read/:username" element={<ReadOther />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
