import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentsBlock from "./CommentsBlock.js";
import { get, post } from "../../utilities";

import heartIcon from "./HeartButton.svg";
import commentIcon from "./CommentButton.svg";
import purpleHeart from "./PurpleHeart.svg";
import purpleComment from "./PurpleComment.svg";
import lightpurpleHeart from "./LightPurpleHeart.svg";
import lightpurpleComment from "./LightPurpleComment.svg";

import "./Feed.css";

const FeedCard = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });

    //make new query to check if person has already liked; update schema with hasLiked = [user_ids]
  }, []);

  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  const [commentClicked, setCommentClicked] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    post("/api/like", { postId: props.postId, userId: props.userId }).then((res) => {
      setLiked(true); //How to update new liked count (don't want to refresh?)
    });
  };

  const handleMouseEnter = (index) => {
    props.setPosts(
      props.posts.map((post, idx) => (idx === index ? { ...post, hover: true } : post))
    );
  };

  const handleMouseLeave = (index) => {
    props.setPosts(
      props.posts.map((post, idx) => (idx === index ? { ...post, hover: false } : post))
    );
  };

  return (
    <div key={props.index} className="post-container">
      <div className="post-top-bar">
        <div className="post-img">
          <img src={props.user.picture} alt="Profile" />
        </div>
        <div className="name-container">
          <Link to={`/profile/${props.creator_username}`}>
            <h2>@{props.creator_username}</h2>
          </Link>

          {props.status === "rated" ? (
            <div> rated</div>
          ) : props.status === "/tbr" ? (
            <div> wants to read</div>
          ) : props.status === "/curr" ? (
            <div> is reading</div>
          ) : (
            <div> finished reading</div>
          )}

          <div> {props.rating}</div>
        </div>
      </div>
      <div className="post-center">
        <div>{props.bookTitle}</div>
        <div>by {props.bookAuthor}</div>
        <div>{props.review}</div>
      </div>
      <div className="post-bottom-bar">
        <div className="buttons-container">
          <div
            className="react-img"
            onMouseEnter={() => handleMouseEnter(props.index)}
            onMouseLeave={() => handleMouseLeave(props.index)}
          >
            {!liked ? (
              <div onClick={() => handleLike()}>
                <div className="image-container">
                  <img src={lightpurpleHeart} alt="Like" className="default-img" />
                  <img src={heartIcon} alt="Like" className="hover-img" />
                </div>
                <button className="react-btn">Like</button>
              </div>
            ) : (
              <div>
                <div className="image-container">
                  <img src={purpleHeart} alt="Like" className="default-img" />
                </div>
                <button className="react-btn">Liked</button>
              </div>
            )}
          </div>
          <div
            className="react-img"
            onMouseEnter={() => handleMouseEnter(props.index)}
            onMouseLeave={() => handleMouseLeave(props.index)}
          >
            <div className="image-container" onClick={() => setCommentClicked(!commentClicked)}>
              <div>
                <img src={lightpurpleComment} alt="Comment" className="default-img" />
                <img src={commentIcon} alt="Comment" className="hover-img" />{" "}
              </div>
              <button className="react-btn comment-btn">Comment</button>
              {commentClicked && ( //How to display comment box on click
                <CommentsBlock
                  post={props}
                  comments={comments}
                  creator_id={props.creator_id}
                  userId={props.userId}
                  addNewComment={addNewComment}
                />
              )}
            </div>
          </div>
        </div>
        <div className="likes-style">
          <h6>{props.likeCount} Likes</h6>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
