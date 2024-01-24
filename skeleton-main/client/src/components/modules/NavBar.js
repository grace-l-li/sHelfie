import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "./HomeIcon.svg";
import profileIcon from "./ProfileIcon.svg";
import logo from "./ShelfieLogo.svg";
import "./NavBar.css";
import Searchbar from "./Searchbar";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <NavLink to="/home" exact className="NavBar-title">
        <img src={logo} alt="s(H)elfie" />
      </NavLink>
      <div>
        <Searchbar />
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <NavLink to="/home" exact className="NavBar-link">
          <img src={homeIcon} alt="Home" />
        </NavLink>
        <NavLink to="/profile/" activeClassName="active" className="NavBar-link">
          <img src={profileIcon} alt="Profile" />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
