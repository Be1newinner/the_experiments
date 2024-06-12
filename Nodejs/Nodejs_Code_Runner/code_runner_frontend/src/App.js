import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [question, setQuestion] = useState("");
  const [questionID, setQuestionID] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  // const [questionID, setQuestionID] = useState("");

  async function submitAnswer() {
    console.log(inputData, questionID);
    const data = await fetch("http://localhost:5000/run-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: inputData,
        question: questionID,
      }),
    });
    const response = await data.json();
    if (response.isPassed) {
      let temp = score;
      temp++;
      setScore(temp);
      localStorage.setItem("score", temp);
    }
    setStatus(response.isPassed ? " PASSED" : " FAILED");
    console.log("SUBMIT RESPONSE => ", response);
  }

  async function getQuestion() {
    const data = await fetch("http://localhost:5000/ask-question", {
      method: "POST",
    });
    const response = await data.json();
    return response;
  }

  useEffect(() => {
    (async function () {
      const question = await getQuestion();
      setQuestion(question?.question || "");
      setInputData(question?.initialCode || "");
      setQuestionID(question.id);
      // console.log(question);

      const scores = JSON.parse(localStorage.getItem("score"));
      setScore(scores);
      // console.log("Score ", typeof scores, scores);
    })();
  }, []);

  return (
    <div>
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: 10,
        }}
      >
        <h2
          style={{
            color: "white",
          }}
        >
          My Code Runner
        </h2>
        <span>Score : {score}</span>
        <span>Status : {status}</span>
        <button
          onClick={submitAnswer}
          style={{
            padding: "10px 40px",
          }}
        >
          Submit
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "50%",
            backgroundColor: "#111",
            padding: 10,
            borderRadius: 10,
            overflow: "auto",
          }}
        >
          <pre
            style={{
              whiteSpace: "pre-wrap" /* Since CSS 2.1 */,
              fontSize: 18,
            }}
          >
            {question}
          </pre>
        </div>
        <textarea
          cols={100}
          rows={40}
          style={{
            width: "100%",
            maxWidth: "50%",
            borderRadius: 10,
            padding: 10,
            backgroundColor: "black",
            color: "white",
            whiteSpace: "pre-wrap" /* Since CSS 2.1 */,
          }}
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
        />
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            marginTop: 5,
          }}
        >
          support : Vijay Kumar | be1newinner@gmail.com
        </p>
      </div>
    </div>
  );
}

export default App;
