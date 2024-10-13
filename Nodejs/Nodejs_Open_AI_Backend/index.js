require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_goodsincebirth,
});

// console.log(process.env.OPENAI_API_KEY_goodsincebirth);

async function fetchResponse(content) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a text, and your task is to extract the airport codes from it. You need to give them possible combination of places to hangout, he can hangout within two his entry and exit place. You need to give him proper airport address with time taken in each place.",
      },
      {
        role: "user",
        content: content,
      },
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });
  return await response;
}
const response = fetchResponse(
  "I want to hangout from France to England in 1 month"
);
console.log(response);
