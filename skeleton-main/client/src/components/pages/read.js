import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";

const Read = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Bookshelf";
    //     get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>Hi</div>
    </>
  );
};

export default Read;
