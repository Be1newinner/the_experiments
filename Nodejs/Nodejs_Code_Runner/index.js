const express = require("express");
const ivm = require("isolated-vm");
// const code = require("./code");
const questionsBank = require("./Questions.json");

const app = express();
const PORT = 3000;
app.use(express.json());

async function runCode(scriptPassed) {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = await isolate.createContext();
  const script = await isolate.compileScript(scriptPassed);
  const result = await script.run(context);
  return result;
}

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello!");
  res.end();
});

app.post("/run-code", async (req, res) => {
  const codeData = req.body.code;
  const questionID = req.body.question;

  const userQuestion =
    questionsBank?.find((item) => item.id === questionID) || {};

  // console.log({ userQuestion, questionID, codeData });

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

      console.log("COMPILED => ", answers);
      res.send({ answers, isPassed });
    } catch (error) {
      console.log(error);
      res.send("Unexpected Error!");
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
