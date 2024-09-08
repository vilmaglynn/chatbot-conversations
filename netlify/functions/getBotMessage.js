async function getBotMessage(userMessage) {
  if (!selectedBot.name || !selectedBot.type) {
    return "No bot selected. Please select a bot before sending a message.";
  }

  const botPersonality = getBotPersonality(selectedBot.type, selectedBot.name);

  try {
    const response = await fetch("/.netlify/functions/getBotMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userMessage: userMessage,
        selectedBotName: selectedBot.name,
        selectedBotType: selectedBot.type,
        botPersonality: botPersonality
      })
    });

    if (!response.ok) {
      return `Error: ${response.status} ${response.statusText}`;
    }

    const result = await response.json();
    return result.botMessage;
  } catch (error) {
    console.error("Failed to get bot message:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}
