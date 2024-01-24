import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const Searchbar = () => {
  const [search, setsearch] = useState("");
  const [bookData, setbookData] = useState([]);

  const searchBook = (evt) => {
    if (evt.key === "Enter"()) {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key= AIzaSyC2SHH8dBbSnfwXSOlpI1KUi8gnq4nJASU" +
            "&maxResults=20"
        )
        .then((res) => setData(res.data.items))
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
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          onKeyPress={searchBook}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
