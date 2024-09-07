exports.handler = async (event) => {
  const { userMessage, selectedBot } = JSON.parse(event.body);
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
          content: `You are a chatbot named ${selectedBot.name}. You have ${selectedBot.personality}`
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
        body: JSON.stringify({
          error: `Error: ${response.status} ${response.statusText}`
        }),
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      };
    }
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result.choices[0].message.content }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  } catch (error) {
    console.error("Failed to get bot message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Sorry, something went wrong. Please try again."
      }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  }
};
