<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./tbr.css";

const TBR = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "TBR";
    //     get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
=======
import "./tbr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const TBR = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "TBR";
    //   get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
>>>>>>> main
  }, []);

  return (
    <>
      <div>TBR</div>

      <a href="/profile/">
<<<<<<< HEAD
        <button>Back</button>
=======
        <button class="dark-btn">Back</button>
>>>>>>> main
      </a>
    </>
  );
};

export default TBR;
