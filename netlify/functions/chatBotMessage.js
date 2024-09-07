const apiUrl =
  "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
const API_KEY = process.env.RAPIDAPI_KEY; // Use an environment variable for your API key

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "POST":
      return handlePostRequest(event);
    case "GET":
      return handleGetRequest(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
  }
};

async function handlePostRequest(event) {
  const { userMessage, botName, botType } = JSON.parse(event.body);

  if (!botName || !botType) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No bot selected." })
    };
  }

  const botPersonality = getBotPersonality(botType, botName);

  const options = {
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
          content: `You are a chatbot named ${botName}. You have ${botPersonality}`
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
    if (!response.ok) {
      console.error("Response error:", await response.text());
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.statusText })
      };
    }
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result.choices[0].message.content })
    };
  } catch (error) {
    console.error("Failed to get bot message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
}

async function handleGetRequest(event) {
  // Implement your GET request handling here if needed
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "GET request not supported" })
  };
}

function getBotPersonality(selectedBotType, selectedBotName) {
  // Define your bot categories and personalities here
  // Or fetch it from a database or other source
}
