import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/SearchBooks.js";
import { post } from "../../utilities.js";
import { useLocation } from "react-router-dom";

const BookModal = ({ show, item, onClose, username, setUser }) => {
  //add prop that checks if we were on search or not
  if (!show) {
    return null;
  }

  const navigate = useNavigate();

  const location = useLocation();
  const currentPage = location.pathname;
  console.log(currentPage === "/curr");

  let title = item.volumeInfo.title;
  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
  let authors = item.volumeInfo.authors; // assuming authors is an array
  let authorNames = authors ? authors.join(", ") : "Unknown Author"; // Join multiple authors with comma or use a placeholder
  let description = item.volumeInfo.description
    ? item.volumeInfo.description
    : "No description available.";

  const handleAddBook = (page) => {
    post(`/api${page}`, { bookId: item.id, rating: -1, review: "" }).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setUser(res.user);
        console.log(username);
        // navigate(page);
        post("/api/post", {
          // creator_id: user._id,
          creator_username: username, //username doesn't change
          status: page,
          bookTitle: title,
          bookAuthor: authorNames, //author names and thumbnail don't show up??
          bookImg: thumbnail,
          rating: -1, //-1 if tbr or current
          review: "",
          likeCount: 0,
        });
        onClose();
      }
    });
  };

  const handleRemoveBook = () => {
    post("/api/remove", { bookId: item.id, page: currentPage }).then((res) => {
      if (!res.error) {
        let updatedData = res.updatedData;
        setUser(updatedData);
        // console.log(res);
        // setUser(res.user); //Why is setUser not a function??
        onClose(); //have to refresh to see updated changes
        // navigate(currentPage);
      }
    });
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
          {["/tbr", "/read", "/curr"].includes(currentPage) && (
            <div className="remove-container">
              <button className="dark-btn" onClick={() => handleRemoveBook()}>
                Remove Book
              </button>
            </div>
          )}
          {["/read"].includes(currentPage) && (
            <div className="review-container">
              <button className="dark-btn">Write a review</button>
            </div>
          )}
          <div className="overlay-inner">
            <div className="book">
              <ul className="front">
                <li>
                  <div className="frontcover">
                    <div className="book-icon">
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
                          <div className="dropdown">
                            <span className="dark-btn">Add Book</span>
                            <div className="dropdown-content add-more-btn">
                              <button className="dark-btn" onClick={() => handleAddBook("/tbr")}>
                                To Be Read
                              </button>

                              <button className="dark-btn" onClick={() => handleAddBook("/curr")}>
                                Currently Reading
                              </button>

                              <button className="dark-btn" onClick={() => handleAddBook("/read")}>
                                Finished Reading
                              </button>
                            </div>
                          </div>
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
