import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <NavLink to="/" exact className="NavBar-title">
        s(H)elfie
      </NavLink>
      <div className="NavBar-linkContainer u-inlineBlock">
        <NavLink to="/" exact activeClassName="active" className="NavBar-link">
          Home
        </NavLink>
        <NavLink to="/profile/" activeClassName="active" className="NavBar-link">
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
