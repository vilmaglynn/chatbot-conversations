const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiUrl =
    "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
  const apiKey = process.env.RAPIDAPI_KEY; // Get API key from environment variables

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const { userMessage, selectedBot } = JSON.parse(event.body);

  if (!selectedBot || !selectedBot.name || !selectedBot.type) {
    return {
      statusCode: 400,
      body: "No bot selected. Please select a bot before sending a message."
    };
  }

  const botPersonality = getBotPersonality(selectedBot.type, selectedBot.name);
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "example-rapidapi-host",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a chatbot named ${selectedBot.name}. You have ${botPersonality}`
        },
        { role: "user", content: userMessage }
      ],
      model: "gpt-4o",
      max_tokens: 100,
      temperature: 0.9
    })
  };

  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Error: ${response.status} ${response.statusText}`
      };
    }
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result.choices[0].message.content)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    };
  }
};
