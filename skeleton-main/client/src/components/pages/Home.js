import React, { useState, useEffect } from "react";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    document.title = "Home";
    // Set the background color when the component mounts
    document.body.style.backgroundColor = "var(--grey)"; // Assuming var(--grey) is defined in your CSS

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []);

  return (
    <div>
      <div className="Home-container">
        <div className="Feed-flex">
          <Feed user={props.user} userId={props.userId} />
        </div>

        <div className="Friends-flex">
          <h3 className="Friends-header">Friend Requests</h3>

          <h3 className="Friends-header">Friends</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
