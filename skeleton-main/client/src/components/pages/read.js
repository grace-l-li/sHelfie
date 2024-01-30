import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import Card from "../modules/Card.js";
import axios from "axios";
import "./SearchBooks.css";

const Read = (props) => {
  useEffect(() => {
    document.title = "Bookshelf";
  }, [props.userId]);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (props.user.read !== undefined) {
        for (const book of props.user.read) {
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
  }, [props.user.read]);
  return (
    <>
      <a href="/profile">
        <button className="dark-btn back-btn">Back</button>
      </a>
      <div className="top-container">
        <h1 className="read-title">{props.user.name}'s Read</h1>
      </div>
      <div className="shelf-flex">
        <div className="left-right"></div>
        <div className="read-container">{<Card book={bookData} />}</div>
        <div className="left-right" />
      </div>
      <div className="top-container" />
    </>
  );
};

export default Read;
