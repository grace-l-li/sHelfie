import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import homeIcon from "./HomeIcon.svg";
import profileIcon from "./ProfileIcon.svg";
import logo from "./ShelfieLogo.svg";
import "./NavBar.css";
import Searchbar from "./Searchbar";
import searchIcon from "./Search.svg";
import addIcon from "./AddButton.svg";

const NavBar = ({ userId, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = () => {
    googleLogout();
    handleLogout();
    navigate("/");
  };
  // const showLogout = () => {
  //   // Check if the current pathname includes '/profile-edit/'
  //   // Adjust the condition based on your routing
  //   return !location.pathname.includes("/profile/edit");
  // };

  return (
    <nav className="NavBar-container">
      <NavLink to="/home" className="NavBar-title">
        <img src={logo} alt="s(H)elfie" />
      </NavLink>
      <div className="NavBar-linkContainer">
        <NavLink to="/home" className="NavBar-link">
          <img src={homeIcon} alt="Home" />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "NavBar-link active" : "NavBar-link")}
        >
          <img src={profileIcon} alt="Profile" />
        </NavLink>
        <NavLink to="/search-books" className="NavBar-link">
          <img src={searchIcon} alt="Search Books" />
        </NavLink>
        <NavLink to="/search-friends" className="NavBar-link">
          <img src={addIcon} alt="Search Friends" />
        </NavLink>
      </div>
      <div className="NavBar-logoutContainer">
        {userId && (
          <button onClick={onLogout} className="logout">
            log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
