import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar.js";
import Feed from "../modules/Feed.js"; // import the Feed component

const Home = () => {
  return (
    <div>
      <NavBar />
      <Feed /> {/* include the Feed component */}
    </div>
  );
};

export default Home;
