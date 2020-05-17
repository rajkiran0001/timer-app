import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import axios from "axios";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  // const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  let [page, setPage] = useState(1);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTutorial = (tutorial, index) => {
    // setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchPage = (page) => {
    axios
      .get(`http://localhost:8080/api/tutorials/?page=${page}&limit=10`)
      .then((res) => {
        console.log(res.data);

        setTutorials(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousPage = () => {
    if (page >= 2 && page <= 31) {
      setPage((page = page - 1));
      fetchPage(page);
    }
  };

  //On everyclick increment the page by one
  const nextPage = (e) => {
    if (page >= 0 && page <= 29) {
      setPage((page = page + 1));
      fetchPage(page);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                <strong>Task Name: </strong>
                {tutorial.title}
                <strong> Description: </strong> {tutorial.description}{" "}
                <strong>Date and Time: </strong>
                {tutorial.dateAndTime} <strong>Spent Time: </strong>
                {tutorial.updatedH}:{tutorial.updatedM}: {tutorial.updatedS}{" "}
                (hh:mm:ss)
              </li>
            ))}
        </ul>
      </div>
      <b>Page: {page >= 1 && page <= 29 ? page : "30"}</b>
      <div>
        <button
          className="button"
          data-test="pagination"
          onClick={previousPage}
        >
          Previous Page
        </button>
        <button className="button" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;
