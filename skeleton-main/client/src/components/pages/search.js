/* Search.js */
import React, { useState, useEffect } from "react";
import "./search.css"; // Import the CSS file
import Searchbar from "../modules/Searchbar";
import Bookcard from "../modules/BookCard";

const Search = (props) => {
  console.log(props.input);

  return (
    <>
      <div>{props.input}</div>
      <div className="search-container">
        <h1 className="title">Book Search</h1>
        <Searchbar />
        {/* <Bookcard /> */}
        <div className="results"></div>
      </div>
    </>
  );
};

export default Search;
