import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // replace with our own API
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {posts.map((post, index) => (
        <div key={index} className="post-container">
          <div className="post-bar post-top-bar">
            <img
              src={post.profilePic}
              alt="Profile"
              style={{ width: "50px", borderRadius: "50%" }}
            />
          </div>
          <div className="post-center">
            {/* Main content */}

            <h2 className="title">{post.title}</h2>
            <p className="review">{post.bookReview}</p>
          </div>
          <div className="post-bar post-bottom-bar">
            <p>
              {post.likes} Likes, {post.comments} Comments
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Feed;
