import React from "react";

const BookModal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }

  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  return (
    <>
      {show ? (
        <div className="overlay">
          <div className="overlay-inner">
            <div class="book">
              <ul class="front">
                <li>
                  <div class="frontcover">
                    <div class="book-icon">
                      <img src={thumbnail} alt=""></img>
                    </div>
                  </div>
                </li>
                <li></li>
              </ul>
              <ul class="page">
                <li />
                <li>
                  <div className="info-container">
                    <div className="close-container">
                      <button className="dark-btn" onClick={onClose}>
                        Close
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div></div>
                    {/* {
                      <p>
                        <button className="close" onClick={onClose}>
                          Close
                          <i class="fas fa-times"></i>
                        </button>
                      </p>
                    } */}
                    {/* <p class="booktitle"> {item.volumeInfo.title}</p>
                    <p>Published in {item.volumeInfo.publishedDate}</p>
                    <i>Written by </i> {item.volumeInfo.authors}
                    <a href={item.volumeInfo.previewLink}>
                      <button>More</button>
                    </a>
                    <h4 className="description">Description: {item.volumeInfo.description}</h4>
                    <button className="AddBook" onClick>
                      Add Book
                      <i class="fas fa-times"></i>
                    </button> */}
                  </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul class="back">
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default BookModal;
