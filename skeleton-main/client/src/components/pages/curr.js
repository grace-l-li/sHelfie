import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./curr.css";

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
        <button>Back</button>
      </a>
    </>
  );
};

export default Curr;
