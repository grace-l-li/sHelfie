import "./tbr.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";

import { get } from "../../utilities.js";

const TbrOther = () => {
  let { username } = useParams();

  const [person, setPerson] = useState({});

  useEffect(() => {
    document.title = "TBR";
    get("/api/userFromUsername", { username: username }).then((res) => {
      setPerson(res.user);
    });
  }, []);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (person.tbr !== undefined) {
        for (const bookId of person.tbr) {
          await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`).then((info) => {
            infoList.push(info.data);
          });
        }
        setBookData(infoList);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <a href={`/profile/${username}`}>
        <button className="dark-btn back-btn other-btn">Back</button>
      </a>

      <div className="everything">
        <div className="toptbr-container">
          <h1 className="tbr-title">{person.name}'s To Be Read</h1>
        </div>

        {/* Ensure that the left and right containers are withineverything */}
        <div className="lefttbr-container"></div>
        <div className="righttbr-container"></div>

        {/* Content goes here */}
        <div className="tbr-outer">
          <div className="tbr-container">
            {<BookCard books={bookData} user={person} />}
            {/*Have to update BookCard to be conditional render for remove & add book*/}
          </div>
        </div>
        <div className="bottomtbr-container"></div>
      </div>
    </>
  );
};

export default TbrOther;
