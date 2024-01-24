import "./tbr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const TBR = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "TBR";
    //   get(`/api/userdata`, { userId: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>TBR</div>

      <a href="/profile/">
        <button class="dark-btn">Back</button>
      </a>
    </>
  );
};

export default TBR;
