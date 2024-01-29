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
        //  tbr = [{bookId:"", rating:, review:""}]
        for (const book of props.user.read) {
          //props.user.read is array

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
      <div className="back-container">
        <a href="/profile/">
          <button className="dark-btn">Back</button>
        </a>
      </div>
      <div className="outer-flex">
        <h1 className="page-title">{props.user.name}'s Read</h1>
        <div className="list-container">
          <div className="container">{<Card book={bookData} />}</div>
        </div>
      </div>
    </>
  );
};

export default Read;
