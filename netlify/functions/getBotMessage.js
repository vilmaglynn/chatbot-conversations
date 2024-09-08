const fetch = require("node-fetch"); // Make sure to install node-fetch if you haven't

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const { userMessage, selectedBotName, selectedBotType } = JSON.parse(
    event.body
  );

  if (!userMessage || !selectedBotName || !selectedBotType) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Bad Request" })
    };
  }

  const botCategories = {
    // Your bot categories definition
  };

  const botCategory = botCategories[selectedBotType];
  const selectedBot = botCategory.find((bot) => bot.name === selectedBotName);
  const botPersonality = selectedBot ? selectedBot.personality : "";

  const apiUrl =
    "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host":
        "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a chatbot named ${selectedBotName}. You have ${botPersonality}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "gpt-4o",
      max_tokens: 100,
      temperature: 0.9
    })
  };

  try {
    const response = await fetch(apiUrl, options);

    if (response.status === 429) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Error 429 - Too Many Requests" })
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
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
