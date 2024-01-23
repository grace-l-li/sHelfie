import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
<<<<<<< HEAD
import "./read.css";
=======
import "./Profile.css";
>>>>>>> main

const Read = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Bookshelf";
    //get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>Read</div>

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

export default Read;
