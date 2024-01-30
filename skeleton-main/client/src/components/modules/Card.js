import React, { useState } from "react";
import BookModal from "./BookModal.js";
import "../pages/SearchBooks.js";

const Card = ({ book, setUser }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setBookItem] = useState();

  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
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
                    <h3 className="title">{item.volumeInfo.title}</h3>
                  </div>
                  <div className="thumbnail-container">
                    <img src={thumbnail} alt="" />
                  </div>
                  <div className="bottom">
                    <h3 className="title">By {authorNames}</h3>
                  </div>
                </div>
                {show && bookItem === item && (
                  <BookModal
                    show={show}
                    item={bookItem}
                    onClose={() => setShow(false)}
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

export default Card;
