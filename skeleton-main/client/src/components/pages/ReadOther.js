import "./read.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";
import WoodTexture from "../modules/Wood.svg";
import DarkWood from "../modules/DarkWood.svg";

import { get } from "../../utilities.js";

const chunkArray = (array, size) => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const ReadOther = (props) => {
  let { username } = useParams();

  const [person, setPerson] = useState({});

  useEffect(() => {
    document.title = "Bookshelf";
    get("/api/userFromUsername", { username: username }).then((res) => {
      setPerson(res.user);
    });
  }, []);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (person.read !== undefined) {
        for (const book of person.read) {
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
  }, [person.read]);

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
            <BookCard key={index} books={[book]} />
          ))}
          {/*Have to update BookCard to be conditional render for remove & add book*/}
        </div>
      </div>
    ));
  };
  return (
    <>
      <a href={`/profile/${username}`}>
        <button className="dark-btn back-btn other-btn">Back</button>
      </a>
      <div className="top-container">
        <div className="shelf-texture">
          <img src={WoodTexture} />
        </div>
        <h1 className="read-title">{person.name}'s Read</h1>
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

export default ReadOther;
