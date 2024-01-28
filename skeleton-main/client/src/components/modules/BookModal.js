import React from "react";
import "../pages/SearchBooks.js";

const BookModal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }

  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let authors = item.volumeInfo.authors; // assuming authors is an array
  let authorNames = authors ? authors.join(", ") : "Unknown Author"; // Join multiple authors with comma or use a placeholder
  let description = item.volumeInfo.description
    ? item.volumeInfo.description
    : "No description available.";

  const handleSubmit = (event, page) => {
    //depending on button: <button onClick={handleSubmit(page: "/tbr")}>
    //                        tbr
    //                     </button>
    let sendPicture = newPicture === "" ? props.user.picture : newPicture;
    post(`/api${page}`, { bookId: item.id, rating: -1, review: "" }).then((res) => {
      if (!res.error) {
        navigate(`${page}`);
      }
    });
  };

  return (
    <>
      {show ? (
        <div className="overlay">
          <div className="overlay-inner">
            <button className="white-btn" onClick={onClose}>
              Close
              <i class="fas fa-times"></i>
            </button>
            <div class="dropdown">
              <span>Add Book</span>
              <div class="dropdown-content">
                <button>Currently reading!</button>

                <button>To be read!</button>

                <button>Read!</button>
              </div>
            </div>
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
                    <div className="title-container">
                      <p className="booktitle"> {item.volumeInfo.title}</p>{" "}
                      <p className="author">Written by {authorNames} </p>
                      <div className="buttons-container">
                        <div className="btn-subcontainer">
                          <a href={item.volumeInfo.previewLink}>
                            <button className="dark-btn add-more-btn">More Info</button>
                          </a>
                        </div>
                      </div>
                      <div className="description-container">
                        <p className="desc-text">Description: {description}</p>
                      </div>
                    </div>

                    {/* {
                      <p>
                        <button className="close" onClick={onClose}>
                          Close
                          <i class="fas fa-times"></i>
                        </button>
                      </p>
                    } */}
                    {/* 
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
