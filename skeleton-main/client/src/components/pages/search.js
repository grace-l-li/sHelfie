import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../modules/Card.js";
import axios from "axios";
import "./search.css";
import "../../utilities.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [bookData, setbookData] = useState([]);
  // const navigate = useNavigate();

  const searchBook = (evt) => {
    if (evt.key === "Enter" || evt.key === " ") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key= AIzaSyC2SHH8dBbSnfwXSOlpI1KUi8gnq4nJASU" +
            "&maxResults=40"
        )
        .then((res) => setbookData(res.data.items))
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
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {search !== "" && bookData !== undefined && (
        <div className="container">{<Card book={bookData} />}</div>
      )}
    </>
  );
};
export default Search;
