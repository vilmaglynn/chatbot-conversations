const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    console.log("OpenAI API response:", JSON.stringify(data, null, 2));

    if (response.ok && data.choices && data.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
      };
    } else {
      console.error("Unexpected response from OpenAI API:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error ? data.error.message : "Unknown error"
        })
      };
    }
  } catch (error) {
    console.error("Serverless function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
