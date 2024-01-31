import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/SearchBooks.js";
import { post } from "../../utilities.js";
import { useLocation } from "react-router-dom";

const BookModal = ({ show, item, onClose, user, setUser }) => {
  //add prop that checks if we were on search or not
  if (!show) {
    return null;
  }

  const navigate = useNavigate();

  const location = useLocation();
  const currentPage = location.pathname;

  let title = item.volumeInfo.title;
  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
  let authors = item.volumeInfo.authors; // assuming authors is an array
  let authorNames = authors ? authors.join(", ") : "Unknown Author"; // Join multiple authors with comma or use a placeholder
  let description = item.volumeInfo.description
    ? item.volumeInfo.description
    : "No description available.";

  const handleAddBook = (page) => {
    post(`/api${page}`, { bookId: item.id }).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setUser(res.user);

        post("/api/post", {
          creator_username: user.username,
          status: page,
          bookTitle: title,
          bookAuthor: authorNames,
          bookImg: thumbnail,
          rating: -1, //-1 if tbr or current
          // review: "",
          likeCount: 0,
        });
        onClose();
      }
    });
  };

  const handleRemoveBook = () => {
    post("/api/remove", { bookId: item.id, page: currentPage }).then((res) => {
      if (!res.error) {
        setUser(res.updatedUser);
        onClose();
      }
    });
  };
  const [showRatingInput, setShowRatingInput] = useState(false);

  // Function to toggle the visibility of the rating input
  const toggleRatingInput = () => {
    setShowRatingInput(!showRatingInput);
  };

  return (
    <>
      {show ? (
        <div className="overlay">
          <div className="close-container">
            <button className="white-btn close-btn" onClick={onClose}>
              Close
            </button>
          </div>

          {["/tbr", "/curr"].includes(currentPage) && (
            <div className="remove-container lower-padding">
              <button className="light-btn" onClick={() => handleRemoveBook()}>
                Remove Book
              </button>
            </div>
          )}
          {["/read"].includes(currentPage) && (
            <div className="review-container lower-padding">
              <div className="read-btn-flx">
                <button className="light-btn" onClick={handleRemoveBook}>
                  Remove Book
                </button>
                <button className="light-btn" onClick={toggleRatingInput}>
                  Give Rating
                </button>
                {showRatingInput && (
                  <div className="rating-input-container">
                    <select>
                      <option value="">Select a Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button>Submit Rating</button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="overlay-inner">
            <div className="book">
              <ul className="front">
                <li>
                  <div className="frontcover">
                    <div className="bookmodal-icon">
                      <img src={thumbnail} alt=""></img>
                    </div>
                  </div>
                </li>
                <li></li>
              </ul>
              <ul className="page">
                <li />
                <li>
                  <div className="info-container">
                    <div className="title-container">
                      <p className="booktitle"> {item.volumeInfo.title}</p>{" "}
                      <p className="author">Written by {authorNames} </p>
                      <div className="buttons-container">
                        <div className="btn-subcontainer">
                          {user && (
                            <div className="dropdown">
                              <span className="dark-btn">Add Book</span>
                              <div className="dropdown-content add-more-btn">
                                <button className="dark-btn" onClick={() => handleAddBook("/tbr")}>
                                  Want To Read
                                </button>

                                <button className="dark-btn" onClick={() => handleAddBook("/curr")}>
                                  Currently Reading
                                </button>

                                <button className="dark-btn" onClick={() => handleAddBook("/read")}>
                                  Finished Reading
                                </button>
                              </div>
                            </div>
                          )}
                          <div>
                            <a href={item.volumeInfo.previewLink}>
                              <button className="dark-btn add-more-btn">More Info</button>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="description-container">
                        <p className="desc-text">Description: {description}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className="back">
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
