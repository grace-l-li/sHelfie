import React, { useState } from "react";
import BookCard from "../modules/BookCard.js";
import axios from "axios";
import "./SearchBooks.css";
import "../../utilities.css";

const BookSearch = (props) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);

  const searchBook = (evt) => {
    if (evt.key === "Enter" || evt.key === " ") {
      //Do time after 3 seconds
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key= AIzaSyC2SHH8dBbSnfwXSOlpI1KUi8gnq4nJASU" +
            "&maxResults=40"
        )
        .then((res) => {
          setBookData(res.data.items);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="header">
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
          </div>
        </div>
      </div>
      {search !== "" && bookData !== undefined && (
<<<<<<< HEAD
        <div className="container">
=======
        <div className="gridcontainer">
>>>>>>> 7120c9498be61c10f0223da27fa96f9a48907e88
          {<BookCard books={bookData} setUser={props.setUser} user={props.user} />}
        </div>
      )}
      ;
    </>
  );
};
export default BookSearch;
