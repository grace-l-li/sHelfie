import "./read.css";

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";
import WoodTexture from "../modules/Wood.svg";

const chunkArray = (array, size) => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

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

  const renderShelfRows = () => {
    // Split the bookData into chunks of 3
    const chunkedBookData = chunkArray(bookData, 3);

    return chunkedBookData.map((chunk, index) => (
      <div className="shelf-row" key={index}>
        {index !== 0 && (
          <div className="single-shelf">
            {" "}
            <div className="shelf-texture">
              <img src={WoodTexture} />
            </div>
          </div>
        )}
        <div className="read-container">
          {chunk.map((book, index) => (
            <BookCard key={index} books={[book]} user={props.user} setUser={props.setUser} />
          ))}
        </div>
      </div>
    ));
  };
  return (
    <>
      <a href="/profile">
        <button className="dark-btn back-btn">Back</button>
      </a>
      <div className="top-container">
        <div className="shelf-texture">
          <img src={WoodTexture} />
        </div>
        <h1 className="read-title">{props.user.name}'s Read</h1>
      </div>
      <div className="shelf-flex">
        <div className="left-right">
          <div className="shelf-texture">
            <img src={WoodTexture} />
          </div>
        </div>
        <div className="rows-container">
          {bookData.length > 0 ? (
            <div>
              {/* ... */}
              {renderShelfRows(bookData)}
              {/* ... */}
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="left-right">
          <div className="shelf-texture">
            <img src={WoodTexture} />
          </div>
        </div>
      </div>
      <div className="top-container">
        <div className="shelf-texture">
          <img src={WoodTexture} />
        </div>
      </div>
    </>
  );
};

export default Read;
