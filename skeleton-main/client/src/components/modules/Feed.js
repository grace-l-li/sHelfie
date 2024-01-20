import React, { useState, useEffect } from "react";

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
        <div
          key={index}
          style={{
            width: "80%",
            backgroundColor: "#f8f9fa",
            margin: "20px 0",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <img src={post.profilePic} alt="Profile" style={{ width: "50px", borderRadius: "50%" }} />
          <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
          <p>{post.bookReview}</p>
          <p>
            {post.likes} Likes, {post.comments} Comments
          </p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
