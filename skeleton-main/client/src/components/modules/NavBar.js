import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "./HomeIcon.svg";
import profileIcon from "./ProfileIcon.svg";
import logo from "./ShelfieLogo.svg";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <NavLink to="/" exact className="NavBar-title">
        <img src={logo} alt="s(H)elfie" />
      </NavLink>
      <div className="NavBar-linkContainer u-inlineBlock">
        <NavLink to="/" exact className="NavBar-link">
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
