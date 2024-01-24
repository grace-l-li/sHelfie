import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const Read = (props) => {
  useEffect(() => {
    document.title = "Bookshelf";
  }, [props]);

  return (
    <>
      <div>{JSON.stringify(props.userData.read)}</div>

      <a href="/profile/">
        <button className="dark-btn">Back</button>
      </a>
    </>
  );
};

export default Read;
