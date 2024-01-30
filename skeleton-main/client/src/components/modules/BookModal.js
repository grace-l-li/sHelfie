import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/SearchBooks.js";
import { post } from "../../utilities.js";

const BookModal = ({ show, item, onClose, setUser }) => {
  //add prop that checks if we were on search or not
  if (!show) {
    return null;
  }

  const navigate = useNavigate();

  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
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
        navigate(page);
      }
    });
  };

  // const handleSubmitCurr = () => {
  //   post("/api/curr", { bookId: item.id, rating: -1, review: "" }).then((res) => {
  //     if (!res.error) {
  //       setUser(res.user);
  //       navigate(page);
  //     } else {
  //       alert(res.error);
  //     }
  //   });
  // };

  // const handleSubmitRead = (page) => {
  //   post(`/api${page}`, { bookId: item.id, rating: -1, review: "" }).then((res) => {
  //     if (!res.error) {
  //       navigate("/read");
  //     } else {
  //       alert(res.error);
  //     }
  //   });
  // };

  const handleRemoveBook = () => {
    post("/remove", {});

    if (!res.erro) {
      onClose();
    }
  };

  return (
    <>
      {show ? (
        <div className="overlay">
          <div className="close-container">
            <button className="white-btn close-btn" onClick={onClose}>
              Close
            </button>

            <button className="dark-btn" onClick={handleRemoveBook}>
              Remove Book
            </button>
          </div>
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
                              <button onClick={() => handleAddBook("/curr")}>
                                Currently Reading
                              </button>

                              <button onClick={() => handleAddBook("/tbr")}>To Be Read</button>

                              <button onClick={() => handleAddBook("/read")}>
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
