import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentsBlock from "./CommentsBlock.js";
import { get, post } from "../../utilities";

import heartIcon from "./HeartButton.svg";
import commentIcon from "./CommentButton.svg";
import filledHeart from "./filledHeart.svg";
import lightpurpleHeart from "./LightPurpleHeart.svg";
import lightpurpleComment from "./LightPurpleComment.svg";
import yellowStar from "./YellowStar.svg";
import greyStar from "./GreyStar.svg";

import "./Feed.css";

const FeedCard = (props) => {
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   get("/api/comment", { parent: props._id }).then((comments) => {
  //     setComments(comments);
  //   });

  //make new query to check if person has already liked; update schema with hasLiked = [user_ids]
  // }, []

  // const addNewComment = (commentObj) => {
  //   setComments(comments.concat([commentObj]));
  // };

  // const [commentClicked, setCommentClicked] = useState(false);
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

  const renderStars = () => {
    const stars = [];
    if (props.rating !== -1) {
      // Add yellow stars up to the rating
      for (let i = 0; i < props.rating; i++) {
        stars.push(<img key={`star-${i}`} src={yellowStar} alt="Star" className="star" />);
      }
      // Add grey stars for the remaining count
      for (let i = props.rating; i < 5; i++) {
        stars.push(<img key={`star-${i}`} src={greyStar} alt="Star" className="star" />);
      }
    }
    return stars;
  };

  return (
    <div key={props.index} className="post-container">
      <div className="post-top-bar">
        <div className="post-img">
          <img src={props.creator_picture} alt="Profile" />
        </div>
        <div className="name-container">
          <Link to={`/profile/${props.creator_username}`}>
            <h2 className="name-style">@{props.creator_username}</h2>
          </Link>

          {props.status === "rated" ? (
            <div className="status"> rated</div>
          ) : props.status === "/tbr" ? (
            <div className="status"> wants to read</div>
          ) : props.status === "/curr" ? (
            <div className="status">is reading</div>
          ) : (
            <div className="status">finished reading</div>
          )}
        </div>
        <div className="rating-container"> {renderStars()}</div>
      </div>
      <div className="post-center">
        <div className="post-center-left">
          <div className="titlebook">{props.bookTitle}</div>
          <div className="authorbook">by {props.bookAuthor}</div>
          <div className="reviewbook">{props.review}</div>
          <div>{props.review !== "" && <button className="see-review">See Review</button>} </div>
        </div>
        <div className="post-center-right img-book">
          <img src={props.bookImg} alt="Book" />
        </div>
      </div>
      <div className="post-bottom-bar">
        <div className="buttons-container2">
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
              </div>
            ) : (
              <div>
                <div className="image-container">
                  <img src={filledHeart} alt="Like" className="default-img" />
                  <img src={filledHeart} alt="Like" className="hover-img" />
                </div>
              </div>
            )}
          </div>
          {/* <div
            className="react-img"
            onMouseEnter={() => handleMouseEnter(props.index)}
            onMouseLeave={() => handleMouseLeave(props.index)}
          >
            <div className="image-container" onClick={() => setCommentClicked(!commentClicked)}>
              <div>
                <img src={lightpurpleComment} alt="Comment" className="default-img" />
                <img src={commentIcon} alt="Comment" className="hover-img" />{" "}
              </div>
              {commentClicked && (
                <CommentsBlock
                  post={props}
                  comments={comments}
                  creator_id={props.creator_id}
                  userId={props.userId}
                  addNewComment={addNewComment}
                />
              )}
            </div>
          </div> */}
        </div>
        <div className="likes-container">
          <h6 className="likes-style">{props.likeCount} Likes</h6>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
