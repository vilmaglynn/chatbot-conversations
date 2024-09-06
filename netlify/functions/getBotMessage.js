async function getBotMessage(userMessage, selectedBot) {
  try {
    const response = await fetch("/.netlify/functions/getBotMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a chatbot named ${selectedBot.name}. You have ${selectedBot.personality}`
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get bot message:", error);
  }
}
