import "./curr.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../utilities.css";
import "./Profile.css";
import "./subpage.css";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";
import Wood from "../modules/Wood.svg";

import { get } from "../../utilities.js";

const CurrOther = (props) => {
  let { username } = useParams();

  const [person, setPerson] = useState({});

  useEffect(() => {
    document.title = "Currently Reading";
    get("/api/userFromUsername", { username: username }).then((res) => {
      setPerson(res.user);
    });
  }, []);

  const [bookData, setBookData] = useState([]);
  let infoList = [];

  useEffect(() => {
    const fetchData = async () => {
      if (person.curr !== undefined) {
        for (const book of person.curr) {
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
  }, []);

  return (
    <>
      <a href={`/profile/${username}`}>
        <button className="white-btn back-btn other-btn">Back</button>
      </a>
      <div className="currtop-container">
        <h1 className="curr-title">{person.name}'s Currently Reading</h1>
      </div>
      <div className="curr-container">
        <div className="circle">
          <div className="woodstyling">
            <img src={Wood} />
          </div>
          <div className="currbooks-container">
            {<BookCard books={bookData} user={person} />}
            {/*Have to update BookCard to be conditional render for remove & add book*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrOther;
