import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const Read = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Bookshelf";
    //get(`/api/userdata`, { userId: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>Read</div>

      <a href="/profile/">
        <button class="dark-btn">Back</button>
      </a>
    </>
  );
};

export default Read;
