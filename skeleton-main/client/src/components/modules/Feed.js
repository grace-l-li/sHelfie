import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Feed.css";
import FeedCard from "./FeedCard.js";

import { get, post } from "../../utilities";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get("/api/posts")
      .then((feedList) => {
        let reversedFeedList = feedList.reverse();
        return reversedFeedList;
      })
      .then((data) => {
        const postsWithHover = data.map((post) => ({ ...post, hover: false }));
        setPosts(postsWithHover);
      });
  }, []);

  let postDisplay = null;
  const hasFeed = posts.length !== 0;
  if (hasFeed) {
    postDisplay = posts.map((post, index) => (
      <FeedCard
        key={`FeedCard_${index}`}
        index={index}
        postId={post._id}
        creator_id={post.creator_id}
        creator_username={post.creator_username}
        status={post.status}
        bookTitle={post.bookTitle}
        bookAuthor={post.bookAuthor}
        bookImg={post.bookImg}
        rating={post.rating}
        review={post.review}
        likeCount={post.likeCount}
        userId={props.userId}
        user={props.user}
        posts={posts}
        setPosts={setPosts}
      />
    ));
  } else {
    postDisplay = <div>No updates!</div>;
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* {props.userId && <NewStory addNewStory={addNewStory} />} */}
        {postDisplay}
      </div>
    </>
  );
};

export default Feed;
