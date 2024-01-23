import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
<<<<<<< HEAD
import "./curr.css";
=======
import "./Profile.css";
>>>>>>> main

const Curr = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Currently Reading";
    // get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>Currently Reading</div>

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

export default Curr;
