// import React, { useState, useEffect } from "react";
// import "../../utilities.css";
// import "./Feed.css";
// import heartIcon from "./HeartButton.svg";
// import commentIcon from "./CommentButton.svg";
// import purpleHeart from "./PurpleHeart.svg";

// const handleMouseEnter = (index) => {
//   setPosts(posts.map((post, idx) => (idx === index ? { ...post, hover: true } : post)));
// };

// const handleMouseLeave = (index) => {
//   setPosts(posts.map((post, idx) => (idx === index ? { ...post, hover: false } : post)));
// };

// const Feed = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => response.json())
//       .then((data) => {
//         const postsWithHover = data.map((post) => ({ ...post, hover: false }));
//         setPosts(postsWithHover);
//       });
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       {posts.map((post, index) => (
//         <div key={index} className="post-container">
//           <div className="post-bar post-top-bar">
//             <img
//               src={post.profilePic}
//               alt="Profile"
//               style={{ width: "50px", borderRadius: "50%" }}
//             />
//           </div>
//           <div className="post-center">
//             {/* Main content */}

//             <h2 className="title">{post.title}</h2>
//             <p className="review">{post.bookReview}</p>
//           </div>
//           <div className="post-bar post-bottom-bar">
//             <div className="buttons-container">
//               <div
//                 className="like-btn"
//                 onMouseEnter={() => handleMouseEnter(index)}
//                 onMouseLeave={() => handleMouseLeave(index)}
//               >
//                 <img src={post.hover ? purpleHeart : heartIcon} alt="Like" />
//                 <button className="react-btn">Like</button>
//               </div>
//               {/* <div className="like-btn">
//                 <img src={heartIcon} alt="Like" />
//                 <button className="react-btn">Like</button>
//               </div> */}
//               <div className="comment-btn">
//                 <img src={commentIcon} alt="Comment" />
//                 <button className="react-btn">Comment</button>
//               </div>
//             </div>
//             {/* <p>
//               {post.likes} Likes, {post.comments} Comments
//             </p> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Feed;

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";
import heartIcon from "./HeartButton.svg";
import commentIcon from "./CommentButton.svg";
import purpleHeart from "./PurpleHeart.svg";
import purpleComment from "./PurpleComment.svg";

const Feed = () => {
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
