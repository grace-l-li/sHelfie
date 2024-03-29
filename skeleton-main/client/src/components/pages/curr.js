import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";
import Wood from "../modules/Wood.svg";

const Curr = (props) => {
  useEffect(() => {
    document.title = "Currently Reading";
  }, [props.userId]);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (props.user.curr !== undefined) {
        for (const bookId of props.user.curr) {
          await axios
            .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then((info) => {
              infoList.push(info.data);
            });
        }
        setBookData(infoList);
      }
    };
    fetchData();
  }, [props.user.curr]);

  return (
    <>
      <a href="/profile">
        <button className="white-btn back-btn">Back</button>
      </a>
      <div className="currtop-container">
        <h1 className="curr-title">{props.user.name}'s Currently Reading</h1>
      </div>
      <div className="curr-container">
        <div className="circle">
          <div className="woodstyling">
            <img src={Wood} />
          </div>
          <div className="currbooks-container">
            {<BookCard books={bookData} user={props.user} setUser={props.setUser} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Curr;
