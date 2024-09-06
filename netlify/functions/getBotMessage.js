const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { userMessage, selectedBot } = JSON.parse(event.body);

    if (!userMessage || !selectedBot) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid request: Missing userMessage or selectedBot"
        })
      };
    }

    const apiKey = process.env.API_KEY;
    const apiUrl =
      "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a chatbot named ${selectedBot.name}. You have ${selectedBot.personality}`
          },
          { role: "user", content: userMessage }
        ],
        model: "gpt-4o",
        max_tokens: 100,
        temperature: 0.9
      })
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `API request failed with status: ${response.statusText}`
        })
      };
    }

    const result = await response.json();
    const botResponse = result.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ botResponse })
    };
  } catch (error) {
    console.error("Error in serverless function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
