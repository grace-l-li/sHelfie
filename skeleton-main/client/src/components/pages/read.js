import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";

const Read = (props) => {
  useEffect(() => {
    document.title = "Bookshelf";
  }, [props]);

  return (
    <>
      <div className="back-container">
        <a href="/profile/">
          <button className="dark-btn">Back</button>
        </a>
      </div>
      <div className="outer-flex">
        <h1 className="page-title">{props.user.name}'s Read</h1>
        <div className="list-container">
          <div>{JSON.stringify(props.user.read)}</div>
        </div>
      </div>
    </>
  );
};

export default Read;
