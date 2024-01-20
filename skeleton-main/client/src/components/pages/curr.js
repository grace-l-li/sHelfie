import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import NavBar from "../modules/NavBar";

const Profile = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <NavBar />
    </>
  );
};
