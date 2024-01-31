import "./tbr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";

const TBR = (props) => {
  useEffect(() => {
    document.title = "TBR";
  }, [props.userId]);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (props.user.tbr !== undefined) {
        for (const book of props.user.tbr) {
          await axios
            .get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}`)
            .then((info) => {
              infoList.push(info.data);
            });
        }
        setBookData(infoList);
      }
    };
    fetchData();
  }, [props.user.tbr]);

  return (
    <>
      <a href="/profile">
        <button className="dark-btn back-btn">Back</button>
      </a>

      <div className="everything">
        <div className="toptbr-container">
          <h1 className="tbr-title">{props.user.name}'s To Be Read</h1>
        </div>

        {/* Ensure that the left and right containers are within .everything */}
        <div className="lefttbr-container"></div>
        <div className="righttbr-container"></div>

        {/* Content goes here */}
        <div className="tbr-outer">
          <div className="tbr-container">
            {<BookCard book={bookData} user={props.user} setUser={props.setUser} />}
          </div>
        </div>
        <div className="bottomtbr-container"></div>
      </div>
    </>
  );
};

export default TBR;
