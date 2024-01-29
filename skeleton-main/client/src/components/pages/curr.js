import "./curr.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import Card from "../modules/Card.js";
import axios from "axios";
import "./SearchBooks.css";

const Curr = (props) => {
  useEffect(() => {
    document.title = "Currently Reading";
    // console.log(props.userId);
  }, [props.userId]);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (props.user.curr !== undefined) {
        //  curr = [{bookId:"", rating:, review:""}]
        for (const book of props.user.curr) {
          //props.user.tbr is array

          await axios
            .get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}`)
            .then((info) => {
              // console.log(info);
              infoList.push(info.data);

              // console.log(infoList);
            });
        }
        setBookData(infoList);
      }
    };
    fetchData();
  }, [props.user.curr]);

  return (
    <>
      <div className="back-container">
        <a href="/profile/">
          <button className="dark-btn">Back</button>
        </a>
      </div>
      <div className="outer-flex">
        <h1 className="page-title">{props.user.name}'s Currently Reading</h1>
        <div className="list-container">
          <div className="container">{<Card book={bookData} />}</div>
        </div>
      </div>
    </>
  );
};

export default Curr;
