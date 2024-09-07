const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  const { messages } = JSON.parse(event.body);

  if (!messages || messages.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request: Missing messages" })
    };
  }

  const systemMessage = messages.find((message) => message.role === "system");
  const userMessage = messages.find((message) => message.role === "user");

  if (!systemMessage || !userMessage) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid request: Missing system or user message"
      })
    };
  }

  const apiUrl =
    "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
  const API_KEY = process.env.RAPIDAPI_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a chatbot named ${systemMessage.content}.`
          },
          { role: "user", content: userMessage.content }
        ],
        model: "gpt-4o",
        max_tokens: 100,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
