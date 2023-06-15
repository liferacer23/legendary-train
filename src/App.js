import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { Fragment } from "react";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model Loaded");
  };
  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async (e) => {
    if (e.which !== 13 && model !== null) {
      const passage = passageRef.current.value; // asked q
      const question = questionRef.current.value; // passage
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers[0]?.text);
      console.log(answers[0]?.text);
    }
  };

  return (
    <div className="App">
      <h1>Question Answering System</h1>
      {model === null ? (
        <Fragment>
          <h2>Loading Model...</h2>
        </Fragment>
      ) : (
        <Fragment>
          <div className="form">
            <label htmlFor="passage">Passage</label>
            <textarea
              id="passage"
              ref={passageRef}
              placeholder="Enter passage..."
            ></textarea>
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              ref={questionRef}
              placeholder="Enter question..."
              onKeyPress={answerQuestion}
            ></textarea>
          </div>
          {answer.length > 0 ? (
            answer.map((ans, idx) => (
              <div className="answer" key={idx}>
                <label htmlFor="answer">Answer</label>
                <textarea
                  id="answer"
                  value={ans}
                  placeholder="Answer will appear here..."
                  readOnly
                ></textarea>
              </div>
            ))
          ) : (
            <div className="answer">
              <label htmlFor="answer">Answer</label>
              <textarea
                id="answer"
                value={answer}
                placeholder="Answer will appear here..."
                readOnly
              ></textarea>
            </div>
          )}

          {/* <div className="answer">
            <label htmlFor="answer">Answer</label>
            <textarea
              id="answer"
              value={answer}
              placeholder="Answer will appear here..."
              readOnly
            ></textarea>
          </div> */}
        </Fragment>
      )}
    </div>
  );
}

export default App;
