import React from "react";
import { Link } from "react-router-dom";

import "./Feed.css";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
  return (
    <div className="">
      <Link to={`/profile/${props.creator_id}`} className="">
        {props.creator_username}
      </Link>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
