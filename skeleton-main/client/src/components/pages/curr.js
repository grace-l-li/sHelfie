import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const Curr = (props) => {
  useEffect(() => {
    document.title = "Currently Reading";
  }, [props]);

  return (
    <>
      <div>{JSON.stringify(props.userData.curr)}</div>

      <a href="/profile/">
        <button className="dark-btn">Back</button>
      </a>
    </>
  );
};

export default Curr;
