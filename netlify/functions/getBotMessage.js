const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // Parse the incoming event body
  const { userMessage, selectedBot } = JSON.parse(event.body);

  // Validate that the required information is provided
  if (!userMessage || !selectedBot) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid request: Missing userMessage or selectedBot"
      })
    };
  }

  const API_KEY = process.env.API_KEY; // Securely access the API key

  const apiUrl =
    "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";

  // Prepare the request options, including bot personality info in the system message
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: selectedBot.type,
      messages: [
        {
          role: "system",
          content: `You are a chatbot named ${selectedBot.name}. You have ${selectedBot.personality}.`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  };

  // Attempt the API call
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ botResponse: data.choices[0].message.content })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get bot message" })
    };
  }
};
