// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import homeIcon from "./HomeIcon.svg";
// import profileIcon from "./ProfileIcon.svg";
// import logo from "./ShelfieLogo.svg";
// import "./NavBar.css";
// import { googleLogout } from "@react-oauth/google";

// const NavBar = ({ userId, handleLogout }) => {
//   const navigate = useNavigate();

//   const onLogout = () => {
//     googleLogout();
//     handleLogout();
//     navigate("/"); // Redirect to the landing page after logout
//   };
//   return (
//     <nav className="NavBar-container">
//       <NavLink to="/home" exact className="NavBar-title">
//         <img src={logo} alt="s(H)elfie" />
//       </NavLink>
//       <div className="NavBar-linkContainer u-inlineBlock">
//         <NavLink to="/home" exact className="NavBar-link">
//           <img src={homeIcon} alt="Home" />
//         </NavLink>
//         <NavLink to="/profile/" activeClassName="active" className="NavBar-link">
//           <img src={profileIcon} alt="Profile" />
//         </NavLink>
//         <button onClick={onLogout} className="NavBar-link">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import homeIcon from "./HomeIcon.svg";
import profileIcon from "./ProfileIcon.svg";
import logo from "./ShelfieLogo.svg";
import "./NavBar.css";

const NavBar = ({ userId, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    googleLogout();
    handleLogout();
    navigate("/");
  };

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
        <div className="NavBar-logoutContainer">
          {userId && (
            <button onClick={onLogout} className="logout">
              log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
//   return (
//     <nav className="NavBar-container">
//       <NavLink to="/home" className="NavBar-title">
//         <img src={logo} alt="s(H)elfie" />
//       </NavLink>
//       <div className="NavBar-linkContainer u-inlineBlock">
//         <NavLink to="/home" className="NavBar-link">
//           <img src={homeIcon} alt="Home" />
//         </NavLink>
//         <NavLink
//           to="/profile"
//           className={({ isActive }) => (isActive ? "NavBar-link active" : "NavBar-link")}
//         >
//           <img src={profileIcon} alt="Profile" />
//         </NavLink>
//         {userId && (
//           <button onClick={onLogout} className="logout">
//             log out
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
