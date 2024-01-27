import React from "react";
// import { useState } from "react/cjs/react.development";
import Modal from "./modal.js";

const BookCard = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  console.log(book);
  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail != undefined && amount != undefined) {
          return (
            <>
              <div
                className="card"
                onClick={() => {
                  setShow(true);
                  setItem(item);
                }}
              >
                <img src={thumbnail} alt="" />
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  {/* <p className="amount">${amount}</p> */}
                  <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};
export default BookCard;
