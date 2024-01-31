import React, { useState, useEffect } from "react";
import Feed from "../modules/Feed.js";
import "../../utilities.css";
import "./Home.css";
import FriendRequests from "../modules/FriendRequests.js";
import Friends from "../modules/Friends.js";

import { get } from "../../utilities.js";

const Home = (props) => {
  const [reqData, setReqData] = useState([]);
  const [frData, setFrData] = useState([]);
  let reqList = [];
  let frList = [];

  useEffect(() => {
    const fetchReqList = async () => {
      if (props.user.friend_reqs !== undefined) {
        for (const userId of props.user.friend_reqs) {
          await get("/api/userFromId", { userId: userId }).then((user) => {
            reqList.push(user);
          });
        }
        setReqData(reqList);
      }
    };

    const fetchFrList = async () => {
      if (props.user.friends !== undefined) {
        for (const userId of props.user.friends) {
          await get("/api/userFromId", { userId: userId }).then((user) => {
            frList.push(user);
          });
        }
        setFrData(frList);
      }
    };

    fetchReqList();
    fetchFrList();
  }, [props.user.friends, props.user.friend_reqs]);

  useEffect(() => {
    document.title = "Home";
    // Set the background color when the component mounts
    document.body.style.backgroundColor = "var(--grey)"; // Assuming var(--grey) is defined in your CSS

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default or previous color
    };
  }, []);

  let render = reqData.length !== 0;

  return (
    <div>
      <div className="Home-container">
        <div className="Feed-flex">
          <Feed user={props.user} userId={props.userId} />
        </div>
        <div className="Friends-flex">
          {render && (
            <>
              <div>
                <h3 className="Friends-header">Friend Requests</h3>
                <div>{<FriendRequests friends={reqData} />}</div>
              </div>
              <div className="line" />
            </>
          )}
          <div>
            <h3 className="Friends-header">Friends</h3>
            <div>{<Friends friends={frData} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
