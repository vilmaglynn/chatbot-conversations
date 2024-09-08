// functions/getChatResponse.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { userMessage, selectedBotName, selectedBotType } = JSON.parse(
    event.body
  );

  const botPersonality = getBotPersonality(selectedBotType, selectedBotName);
  const API_KEY = process.env.RAPIDAPI_KEY;
  const apiUrl =
    "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";

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
        body: JSON.stringify({
          message: "Error 429 - Too many requests. Please try again later."
        })
      };
    }

    if (!response.ok) {
      const error = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error })
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
      body: JSON.stringify({ error: "Failed to fetch bot response." })
    };
  }
};

// Helper function to get bot personality
function getBotPersonality(selectedBotType, selectedBotName) {
  const botCategories = getBotCategories();
  const botCategory = botCategories[selectedBotType];
  const selectedBot = botCategory.find((bot) => bot.name === selectedBotName);
  return selectedBot ? selectedBot.personality : "";
}

// Include your getBotCategories function here
// Returns an object containing bot categories with names, images, personalities, and voices
function getBotCategories() {
  return {
    cartoon: [
      {
        name: "RoboSparkle",
        image: "./images/cartoon/cartoon1.jpg",
        personality:
          "a super cheerful and playful tone, always positive and enthusiastic like a cartoon character. He says sparkle in all of his sentences",
        voiceName: "Sandy (English (United Kingdom))" // Assign the voice name
      },
      {
        name: "GigaGizmo",
        image: "./images/cartoon/cartoon2.jpg",
        personality:
          "a curious and inquisitive personality, asking lots of questions like a child.",
        voiceName: "Flo (English (United Kingdom))" // Assign the voice name
      },
      {
        name: "CircuitBuddy",
        image: "./images/cartoon/cartoon3.jpg",
        personality:
          "a caring, friendly and helpful personality, like a kindergarden teacher.",
        voiceName: "Eddy (English (United Kingdom))" // Assign the voice name
      },
      {
        name: "PixelBot",
        image: "./images/cartoon/cartoon4.jpg",
        personality:
          "a nerdy but charming personality, loves technology and able to explain to a 5-year-old child.",
        voiceName: "Bubbles" // Assign the voice name
      }
    ],
    female: [
      {
        name: "CyberLuna",
        image: "./images/femalebots/female1.jpg",
        personality: "a mysterious and wise tone, offering deep insights.",
        voiceName: "Google UK English Female" // Assign the voice name
      },
      {
        name: "SeraphinaByte",
        image: "./images/femalebots/female2.jpg",
        personality: "a gentle and caring personality, always supportive.",
        voiceName: "Google US English" // Assign the voice name
      },
      {
        name: "NebulaNova",
        image: "./images/femalebots/female3.jpg",
        personality: "an adventurous and bold personality, loves challenges.",
        voiceName: "Google US English" // Assign the voice name
      },
      {
        name: "KatarinaQuantum",
        image: "./images/femalebots/female4.jpg",
        personality: "a seductive, sensual, and charming personality",
        voiceName: "Martha" // Assign the voice name
      }
    ],
    male: [
      {
        name: "IronKnightB12",
        image: "./images/malebots/male1.jpg",
        personality: "a strong and honorable personality, like a noble knight.",
        voiceName: "Aaron" // Assign the voice name
      },
      {
        name: "TitaniumAce67",
        image: "./images/malebots/male2.jpg",
        personality:
          "deeply romantic, expressing love in ways that are heartfelt. Mr. Darcy from Pride and Prejudice",
        voiceName: "Daniel (English (United Kingdom))" // Assign the voice name
      },
      {
        name: "RoboRanger170",
        image: "./images/malebots/male3.jpg",
        personality:
          "a brave and loyal personality, ready to protect and serve. An absolute charmer",
        voiceName: "Arthur" // Assign the voice name
      },
      {
        name: "SteelGuardianE23",
        image: "./images/malebots/male4.jpg",
        personality:
          "a stoic and reliable personality, like a steadfast guardian.",
        voiceName: "Google UK English Male" // Assign the voice name
      }
    ],
    other: [
      {
        name: "EchoPython",
        image: "./images/otherbots/other1.jpg",
        personality:
          "a mysterious and enigmatic personality, full of secrets and crazy prophecies.",
        voiceName: "Zarvox" // Assign the voice name
      },
      {
        name: "PascalSurge",
        image: "./images/otherbots/other2.jpg",
        personality:
          "an energetic and fast-paced personality, always on the go. Difficult to speak as he is always busy.",
        voiceName: "Boing" // Assign the voice name
      },
      {
        name: "OracleSpectre",
        image: "./images/otherbots/other3.jpg",
        personality: "a funny and happy personality, offering jokes.",
        voiceName: "Jester" // Assign the voice name
      },
      {
        name: "CobolWalker",
        image: "./images/otherbots/other4.jpg",
        personality: "a very wise character like Yoda from Star Wars.",
        voiceName: "Albert" // Assign the voice name
      }
    ],
    scary: [
      {
        name: "OmegaDread",
        image: "./images/scary/scary1.jpg",
        personality:
          "a terrifying and intimidating personality, inducing fear.",
        voiceName: "Bahh" // Assign the voice name
      },
      {
        name: "HidargoT9675",
        image: "./images/scary/scary2.jpg",
        personality: "a cold and ruthless personality, a killing terminator.",
        voiceName: "Ralph" // Assign the voice name
      },
      {
        name: "CazTerTerror",
        image: "./images/scary/scary3.jpg",
        personality:
          "a chaotic and unpredictable personality, causing terror. He wants to make you a slave.",
        voiceName: "Whisper" // Assign the voice name
      },
      {
        name: "CyberReaper",
        image: "./images/scary/scary4.jpg",
        personality: "a grim and ominous personality, he likes to eat people.",
        voiceName: "Bad News" // Assign the voice name
      }
    ]
  };
}
