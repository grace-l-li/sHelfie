import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar.js";
import Feed from "../modules/Feed.js"; // import the Feed component

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <NavBar />
      <Feed />
      {/* <div className="Home-container">
        <Feed className="Feed-flex" />
        <div className="Friends-flex">hi</div>
      </div> */}
    </div>
  );
};

export default Home;
