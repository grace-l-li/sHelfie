import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";
import heartIcon from "./HeartButton.svg";
import commentIcon from "./CommentButton.svg";
import purpleHeart from "./PurpleHeart.svg";
import purpleComment from "./PurpleComment.svg";
import blankProfile from "./BlankProfile.svg";

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
              <img src={props.userData.picture} alt="Profile" />
            </div>
            <div className="name-container">
              <h2>{props.userData.username}</h2>
            </div>
          </div>
          <div className="post-center">
            {/* Main content */}
            {/* <h2 className="title">{post.title}</h2> */}
            {/* <p className="review">{post.bookReview}</p> */}
          </div>
          <div className="post-bottom-bar">
            <div className="buttons-container">
              <div
                className="react-img"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="image-container">
                  <img src={heartIcon} alt="Like" className="default-img" />
                  <img src={purpleHeart} alt="Like" className="hover-img" />
                </div>
                <button className="react-btn">Like</button>
              </div>
              <div
                className="react-img"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="image-container">
                  <img src={commentIcon} alt="Comment" className="default-img" />
                  <img src={purpleComment} alt="Comment" className="hover-img" />
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
