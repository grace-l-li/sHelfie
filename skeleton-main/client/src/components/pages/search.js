/* Search.js */
import React from "react";
import "./search.css"; // Import the CSS file
import Searchbar from "../modules/Searchbar";

const Search = () => {
  return (
    <div className="search-container">
      <h1 className="title">Book Search</h1>
      <Searchbar />
      <Bookcard />
      <div className="results"></div>
    </div>
  );
};

export default Search;
