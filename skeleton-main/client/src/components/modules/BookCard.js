import React, { useState } from "react";
import BookModal from "./BookModal.js";
import "../pages/SearchBooks.js";
import "../pages/read.css";

const BookCard = ({ books, user, setUser }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setBookItem] = useState();

  return (
    <>
      {books.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        let authors = item.volumeInfo.authors; // assuming authors is an array
        let authorNames = authors ? authors.join(", ") : "Unknown Author"; // Join multiple authors with comma or use a placeholder
        if (thumbnail != undefined) {
          return (
            <>
              <div key={item.id}>
                <div
                  className="card"
                  onClick={() => {
                    setShow(true);
                    setBookItem(item);
                  }}
                >
                  <div className="top">
                    <h3 className="gridtitle">{item.volumeInfo.title}</h3>
                  </div>
                  <div className="thumbnail-container">
                    <img src={thumbnail} alt="" />
                  </div>
                  <div className="bottom">
                    <h3 className="gridtitle">By {authorNames}</h3>
                  </div>
                </div>
                {show && bookItem === item && (
                  <BookModal
                    show={show}
                    item={bookItem}
                    onClose={() => setShow(false)}
                    user={user}
                    setUser={setUser}
                    currentPage="search-books"
                  />
                )}
              </div>
            </>
          );
        }
        return null;
      })}
    </>
  );
};

export default BookCard;
