import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import "../../utilities.css";
import "./Profile.css";
=======
>>>>>>> main
import NavBar from "../modules/NavBar.js";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
<<<<<<< HEAD
    document.title = "Home";
=======
    // Set the background color when the component mounts
    document.body.style.backgroundColor = "var(--grey)"; // Assuming var(--grey) is defined in your CSS

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
>>>>>>> main
  }, []);

  return (
    <div>
      <NavBar />
      <div className="Home-container">
        <Feed className="Feed-flex" />
        <div className="Friends-flex">
          <h3 className="Friends-header">Friend Requests</h3>

          <h3 className="Friends-header">Friends</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
