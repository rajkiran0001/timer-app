import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import "./global.css";
import "../App.css";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [dateandtime] = useState(new Date().toLocaleString());
  const [isVisible, setIsVisible] = useState(false);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const changeStatus = () => {
    clearInterval(interv);
    setStatus(3);
    setIsVisible(true);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime({ ...time, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      updatedS: time.s,
      updatedM: time.m,
      updatedH: time.h,
      dateAndTime: dateandtime,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          updatedS: response.data.updatedS,
          updatedM: response.data.updatedM,
          updatedH: response.data.updatedM,
        });
        setSubmitted(true);
        console.log(response.data);
        setTime({ ms: 0, s: 0, m: 0, h: 0 });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };
  const startTimer = () => {
    setStatus(0);
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
    if (object.target.value >= 24) {
      object.target.value = 23;
    }
    if (object.target.value <= 0) {
      object.target.value = 0;
    }
  };

  const maxMinutesLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
    if (object.target.value >= 60) {
      object.target.value = 59;
    }
    if (object.target.value <= 0) {
      object.target.value = 0;
    }
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div className="form-bg">
          <div className="form-group">
            <label htmlFor="title">Task</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
            {status === 3 ? (
              <div>
                <label htmlFor="description">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  maxLength="2"
                  onInput={maxMinutesLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.s}
                  onChange={handleTimeChange}
                  name="s"
                />
                <label htmlFor="description">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  maxLength="2"
                  onInput={maxMinutesLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.m}
                  onChange={handleTimeChange}
                  name="m"
                />
                <label htmlFor="description">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  maxLength="2"
                  onInput={maxLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.h}
                  onChange={handleTimeChange}
                  name="h"
                />
              </div>
            ) : null}

            <div className="clock-holder">
              <div className="stopwatch">
                <DisplayComponent time={time} />
                <BtnComponent
                  status={status}
                  resume={resume}
                  reset={reset}
                  stop={stop}
                  start={start}
                />
              </div>
            </div>
            <button onClick={changeStatus} className="btn btn-success">
              Manual Time input
            </button>
            {isVisible ? (
              <button onClick={startTimer} className="btn btn-success">
                start timer
              </button>
            ) : null}
          </div>
          <br />
          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
