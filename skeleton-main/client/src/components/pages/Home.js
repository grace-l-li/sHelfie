import React, { useState, useEffect } from "react";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "./Home.css";
import UserCard from "../modules/UserCard.js";

import { get } from "../../utilities.js";

const Home = (props) => {
  const [requestsData, setRequestsData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  const hardCodedList = [
    {
      username: "graceli",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocJdT7J0kFude0A2KLuEDQi-eWXD1kO4PFLGSaGtDoh-fA=s96-c",
    },
    {
      username: "lily",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocJU173LIiJvKqQsvcGoDsa7bJlvsLzqhy9kwZyMTFJnLA=s96-c",
    },
  ];

  useEffect(() => {
    document.title = "Home";
    // Set the background color when the component mounts
    document.body.style.backgroundColor = "var(--grey)"; // Assuming var(--grey) is defined in your CSS

    // let reqList = [];
    // for (const user of props.user.friend_reqs) {
    //   get("/api/userFromId", { userId: user._id }).then((user) => {
    //     ReqList.push(user);
    //   });
    // }
    // setRequestsData(ReqList);

    // let followList = [];
    // for (const user of props.user.friends) {
    //   get("/api/userFromId", { userId: user._id }).then((user) => {
    //     followList.push(user);
    //   });
    // }
    // setRequestsData(ReqList);

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []);

  // setRequestsData(hardCodedList);
  // setFriendsData(hardCodedList);

  return (
    <div>
      <div className="Home-container">
        <div className="Feed-flex">
          <Feed user={props.user} userId={props.userId} />
        </div>

        <div className="Friends-flex">
          <h3 className="Friends-header">Friend Requests</h3>
          {/* <div className="container">{<UserCard friends={hardCodedList} />}</div> */}
          <h3 className="Friends-header">Friends</h3>
          {/* <div className="container">{<UserCard friends={hardCodedList} />}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
