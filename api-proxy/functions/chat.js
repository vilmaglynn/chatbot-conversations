const axios = require("axios");

exports.handler = async function (event, context) {
  // Environment variable to store the API key
  const API_KEY = process.env.API_KEY;

  const body = JSON.parse(event.body);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      body,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error("Error making API request:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request."
      })
    };
  }
};
