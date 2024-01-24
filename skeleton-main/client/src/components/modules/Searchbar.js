import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const Searchbar = (props) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key= AIzaSyC2SHH8dBbSnfwXSOlpI1KUi8gnq4nJASU" +
            "&maxResults=20"
        )
        .then((res) => setBookData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter a book name"
          className="w-full p-4 rounded-full bg-slate-800"
          // value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchBook}
        />

        <NavLink to={{ pathname: "/search/", input: search }}>
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
            <AiOutlineSearch />
          </button>
        </NavLink>
      </div>
    </form>
  );
};

export default Searchbar;
