import React, { useState } from "react";
import Card from "../modules/Card.js";
import axios from "axios";
import "./search.css";

const search = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key= AIzaSyC2SHH8dBbSnfwXSOlpI1KUi8gnq4nJASU" +
            "&maxResults=25"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="search-container">
      <h1 className="title">Book Search</h1>
      <Searchbar />
      <Bookcard />
      <div className="results"></div>
    </div>
  );
};
export default search;
