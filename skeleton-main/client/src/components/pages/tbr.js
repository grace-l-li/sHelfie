import "./tbr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const TBR = (props) => {
  useEffect(() => {
    document.title = "TBR";
  }, [props]);

  return (
    <>
      <div>{JSON.stringify(props.userData.tbr)}</div>

      <a href="/profile/">
        <button className="dark-btn">Back</button>
      </a>
    </>
  );
};

export default TBR;
