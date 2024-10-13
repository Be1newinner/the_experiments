const express = require("express");
const ivm = require("isolated-vm");
const questionsBank = require("./Questions.json");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:9125",
};

const app = express();
const PORT = 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  "/",
  express.static(path.join(__dirname, "code_runner_frontend/build"))
);

async function runCode(scriptPassed) {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = await isolate.createContext();
  const script = await isolate.compileScript(scriptPassed);
  const result = await script.run(context);
  return result;
}

app.post("/run-code", async (req, res) => {
  const codeData = req.body.code;
  const questionID = req.body.question;

  const userQuestion =
    questionsBank?.find((item) => item.id === questionID) || {};

  if (!Object.keys(userQuestion).length) {
    res.send("No Such Question Exist!");
    res.end();
    return;
  }

  if (codeData && typeof codeData === "string") {
    try {
      let isPassed = true;
      const answers = await Promise.all(
        userQuestion?.inputs?.map(async (props) => {
          const result = await runCode(
            codeData.replace("arguments", "[" + props.inputs + "]")
          );
          if (props.answer !== result) isPassed = false;
          return { ...props, isCorrect: props.answer === result };
        })
      );

      // console.log("COMPILED => ", answers);
      res.send({ answers, isPassed });
    } catch (error) {
      // console.log(error);
      res.send({ error: error.message });
    }
  } else {
    res.send("Invalid Input!");
  }

  res.end();
});

app.post("/ask-question", (req, res) => {
  const questionID = req.body.questionID || null;
  let randomQuestionNumber;
  if (questionID && typeof questionID === "number") {
    randomQuestionNumber = questionID;
  } else {
    const length = questionsBank.length - 1;
    randomQuestionNumber = Math.round(Math.random() * length);
    randomQuestionNumber =
      !randomQuestionNumber || randomQuestionNumber < 0
        ? 0
        : randomQuestionNumber;
  }

  const question =
    questionsBank?.find((item) => item.id === randomQuestionNumber) || {};

  console.log(question);

  if (!Object.keys(question).length) {
    res.send("No Such Question Exist!");
    res.end();
    return;
  }

  res.send(question);
  res.end();
});

app.listen(PORT, () => {
  console.log("Program in Running on Port", PORT);
});
