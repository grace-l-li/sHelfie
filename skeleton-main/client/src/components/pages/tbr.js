import "./tbr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";

const TBR = (props) => {
  useEffect(() => {
    document.title = "TBR";
  }, [props]);

  return (
    <>
      <div className="back-container">
        <a href="/profile/">
          <button className="dark-btn">Back</button>
        </a>
      </div>
      <div className="outer-flex">
        <h1 className="page-title">{props.userData.name}'s To Be Read</h1>
        <div className="list-container">
          <div>{JSON.stringify(props.userData.tbr)}</div>
        </div>
      </div>
    </>
  );
};

export default TBR;
