import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";
import heartIcon from "./HeartButton.svg";
import commentIcon from "./CommentButton.svg";
import purpleHeart from "./PurpleHeart.svg";
import purpleComment from "./PurpleComment.svg";
import blankProfile from "./BlankProfile.svg";
import lightpurpleHeart from "./LightPurpleHeart.svg";
import lightpurpleComment from "./LightPurpleComment.svg";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const postsWithHover = data.map((post) => ({ ...post, hover: false }));
        setPosts(postsWithHover);
      });
  }, []);

  const handleMouseEnter = (index) => {
    setPosts(posts.map((post, idx) => (idx === index ? { ...post, hover: true } : post)));
  };

  const handleMouseLeave = (index) => {
    setPosts(posts.map((post, idx) => (idx === index ? { ...post, hover: false } : post)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {posts.map((post, index) => (
        <div key={index} className="post-container">
          <div className="post-top-bar">
            <div className="post-img">
              <img src={props.user.picture} alt="Profile" />
            </div>
            <div className="name-container">
              <h2>@{props.user.username}</h2>
            </div>
          </div>
          <div className="post-center"></div>
          <div className="post-bottom-bar">
            <div className="buttons-container">
              <div
                className="react-img"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="image-container">
                  <img src={lightpurpleHeart} alt="Like" className="default-img" />
                  <img src={heartIcon} alt="Like" className="hover-img" />
                </div>
                <button className="react-btn">Like</button>
              </div>
              <div
                className="react-img"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="image-container">
                  <img src={lightpurpleComment} alt="Comment" className="default-img" />
                  <img src={commentIcon} alt="Comment" className="hover-img" />
                </div>
                <button className="react-btn comment-btn">Comment</button>
              </div>
            </div>
            <div className="likes-style">
              <h6>0 Likes</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
