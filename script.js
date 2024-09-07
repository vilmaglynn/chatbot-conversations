const apiUrl =
  "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
const API_KEY = "1dc16be9ccmsh6df3721a5f10d2ap1f1670jsn2d50fb26ca53"; // Replace with your API key

// Function to get a bot's personality based on selected bot type and name
function getBotPersonality(selectedBotType, selectedBotName) {
  const botCategories = getBotCategories();
  const botCategory = botCategories[selectedBotType];
  if (botCategory) {
    const selectedBot = botCategory.find((bot) => bot.name === selectedBotName);
    return selectedBot ? selectedBot.personality : "";
  }
  return "";
}

// Function to get the bot's message using the selected bot's personality
async function getBotMessage(userMessage) {
  if (!selectedBot.name || !selectedBot.type) {
    return "No bot selected. Please select a bot before sending a message.";
  }

  const botPersonality = getBotPersonality(selectedBot.type, selectedBot.name);
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
          content: `You are a chatbot named ${selectedBot.name}. You have ${botPersonality}`
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
      return `Error: ${response.status} ${response.statusText}`;
    }
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Failed to get bot message:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeBotSelection();
  initializeVoiceRecognition();
  initializeBackgroundChange();
  initializeSettingsToggle();
  deleteMsgAction();
  sendMsgAction();
});

// Function to initialize bot selection
function initializeBotSelection() {
  const botCategories = getBotCategories();
  const typeRadios = document.querySelectorAll('input[name="image"]');
  const botNamesContainer = createBotNamesContainer();

  typeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedCategory = botCategories[radio.value];
      if (selectedCategory) {
        displayBotNames(selectedCategory, botNamesContainer, radio.value); // Pass the type
      }
    });
  });
}

// Returns an object containing bot categories with names, images, and personalities
function getBotCategories() {
  return {
    cartoon: [
      {
        name: "RoboSparkle",
        image: "./images/cartoon/cartoon1.jpg",
        personality:
          "a super cheerful and playful tone, always positive and enthusiastic like a cartoon character. He says sparkle in all of his sentences"
      },
      {
        name: "GigaGizmo",
        image: "./images/cartoon/cartoon2.jpg",
        personality:
          "a curious and inquisitive personality, asking lots of questions like a child."
      },
      {
        name: "CircuitBuddy",
        image: "./images/cartoon/cartoon3.jpg",
        personality:
          "a caring , friendly and helpful personality, like a kindergarden teacher."
      },
      {
        name: "PixelBot",
        image: "./images/cartoon/cartoon4.jpg",
        personality:
          "a nerdy but charming personality, loves technology and able to explain to a 5 year old child."
      }
    ],
    female: [
      {
        name: "CyberLuna",
        image: "./images/femalebots/female1.jpg",
        personality: "a mysterious and wise tone, offering deep insights."
      },
      {
        name: "SeraphinaByte",
        image: "./images/femalebots/female2.jpg",
        personality: "a gentle and caring personality, always supportive."
      },
      {
        name: "NebulaNova",
        image: "./images/femalebots/female3.jpg",
        personality: "an adventurous and bold personality, loves challenges."
      },
      {
        name: "KatarinaQuantum",
        image: "./images/femalebots/female4.jpg",
        personality: "a logical and precise personality, very analytical."
      }
    ],
    male: [
      {
        name: "IronKnightB12",
        image: "./images/malebots/male1.jpg",
        personality: "a strong and honorable personality, like a noble knight."
      },
      {
        name: "TitaniumAce67",
        image: "./images/malebots/male2.jpg",
        personality:
          "a competitive and daring personality, always up for a challenge."
      },
      {
        name: "RoboRanger170",
        image: "./images/malebots/male3.jpg",
        personality:
          "a brave and loyal personality, ready to protect and serve."
      },
      {
        name: "SteelGuardianE23",
        image: "./images/malebots/male4.jpg",
        personality:
          "a stoic and reliable personality, like a steadfast guardian."
      }
    ],
    other: [
      {
        name: "EchoPython",
        image: "./images/otherbots/other1.jpg",
        personality: "a mysterious and enigmatic personality, full of secrets."
      },
      {
        name: "PascalSurge",
        image: "./images/otherbots/other2.jpg",
        personality:
          "an energetic and fast-paced personality, always on the go."
      },
      {
        name: "OracleSpectre",
        image: "./images/otherbots/other3.jpg",
        personality:
          "a wise and cryptic personality, offering riddles and crazyprophecies."
      },
      {
        name: "CobolWalker",
        image: "./images/otherbots/other4.jpg",
        personality:
          "a logical and methodical personality, calculating every move."
      }
    ],
    scary: [
      {
        name: "OmegaDread",
        image: "./images/scary/scary1.jpg",
        personality: "a terrifying and intimidating personality, inducing fear."
      },
      {
        name: "HidargoT9675",
        image: "./images/scary/scary2.jpg",
        personality: "a cold and ruthless personality, without mercy."
      },
      {
        name: "CazTerTerror",
        image: "./images/scary/scary3.jpg",
        personality: "a chaotic and unpredictable personality, causing terror."
      },
      {
        name: "CyberReaper",
        image: "./images/scary/scary4.jpg",
        personality:
          "a grim and ominous personality, like the harbinger of doom."
      }
    ]
  };
}

// Create and return a container for bot names
function createBotNamesContainer() {
  const container = document.createElement("div");
  document.getElementById("settingsHide").appendChild(container);
  return container;
}

// Function to initialize background change functionality
function initializeBackgroundChange() {
  const images = [
    "./images/backgrounds/background-blue1.jpg",
    "./images/backgrounds/background-blue2.jpg",
    "./images/backgrounds/background-blue3.jpg",
    "./images/backgrounds/background-red1.jpg",
    "./images/backgrounds/background-red2.jpg",
    "./images/backgrounds/background-red3.jpg",
    "./images/backgrounds/background-white1.jpg",
    "./images/backgrounds/background-white2.jpg",
    "./images/backgrounds/background-green1.jpg"
  ];

  let currentIndex = 0;
  const backgroundButton = document.getElementById("backgroundButton");

  backgroundButton.addEventListener("click", function (event) {
    event.preventDefault();
    changeBackground(images, currentIndex);
    currentIndex = (currentIndex + 1) % images.length;
  });
}

// Function to change background image
function changeBackground(images, currentIndex) {
  const selectedImage = images[currentIndex];
  document.body.style.backgroundImage = `url('${selectedImage}')`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";
}

// Function to initialize settings toggle
function initializeSettingsToggle() {
  const toggleButton = document.getElementById("toggleSettingsButton");
  const settingsDiv = document.getElementById("settingsHide");

  toggleButton.addEventListener("click", function (event) {
    event.preventDefault();
    toggleSettingsVisibility(settingsDiv);
  });

  settingsDiv.classList.add("hidden");
}

// Function to toggle settings visibility
function toggleSettingsVisibility(settingsDiv) {
  if (settingsDiv.classList.contains("hidden")) {
    settingsDiv.classList.remove("hidden");
    settingsDiv.classList.add("visible");
  } else {
    settingsDiv.classList.remove("visible");
    settingsDiv.classList.add("hidden");
  }
}

function deleteMsgAction() {
  let deleteMsg = document.getElementById("deleteMsg");
  let userMessage = document.getElementById("userMessage");

  deleteMsg.addEventListener("click", function (event) {
    event.preventDefault();
    userMessage.value = ""; // Clear the content of the textarea
  });
}

function initializeVoiceRecognition() {
  const voiceInputButton = document.getElementById("voiceInputButton");
  const recordSound = document.getElementById("recordSound");

  voiceInputButton.addEventListener("click", function () {
    // Play the sound when the button is clicked
    recordSound.currentTime = 0; // Rewind to start in case it was already played
    recordSound
      .play()
      .then(() => {
        // Update button content and class after the sound starts playing
        voiceInputButton.classList.add("recording");
        voiceInputButton.innerHTML =
          'Recording... <i class="fa-solid fa-microphone"></i>';
      })
      .catch((error) => {
        console.error("Error playing sound:", error);
        handleFailure("Failed to play recording sound.");
      });

    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert(
        "Your browser does not support speech recognition. Please use a supported browser like Chrome."
      );
      resetButton();
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
      document.getElementById("userMessage").value =
        event.results[0][0].transcript;
      handleSuccess("Recording Saved");
    };

    recognition.onspeechend = function () {
      recognition.stop();
      if (!voiceInputButton.classList.contains("success")) {
        resetButton();
      }
    };

    recognition.onerror = function (event) {
      if (event.error === "no-speech") {
        alert("No speech was detected. Please try again.");
        handleFailure("No speech detected");
        resetButton();
      } else {
        alert("Error occurred in recognition: " + event.error);
        handleFailure("Recording Failed");
        resetButton();
      }
    };
  });

  function resetButton() {
    voiceInputButton.classList.remove("recording", "success", "failure");
    voiceInputButton.innerHTML =
      'Record Msg <i class="fa-solid fa-microphone"></i>';
  }

  function handleSuccess(message) {
    voiceInputButton.classList.remove("recording");
    voiceInputButton.classList.add("success");
    voiceInputButton.textContent = message;
    setTimeout(resetButton, 2000); // Reset after 2 seconds
  }

  function handleFailure(message) {
    voiceInputButton.classList.remove("recording");
    voiceInputButton.classList.add("failure");
    voiceInputButton.textContent = message;
    setTimeout(resetButton, 2000); // Reset after 2 seconds
  }
}

// Function to display the user's message
function displayUserMessage(message, chatContainer) {
  let newMessage = document.createElement("p");

  let userLabel = document.createElement("span");
  userLabel.className = "user-label";
  userLabel.textContent = "You: ";

  let messageContent = document.createElement("span");
  messageContent.className = "user-message";
  messageContent.textContent = message;

  newMessage.appendChild(userLabel);
  newMessage.appendChild(messageContent);
  chatContainer.appendChild(newMessage);
}

function displayBotMessage(message, chatContainer) {
  let newMessage = document.createElement("p");

  let botLabel = document.createElement("span");
  botLabel.className = "bot-label";
  botLabel.textContent = "Bot: ";

  let messageContent = document.createElement("span");
  messageContent.className = "bot-message";
  messageContent.textContent = message;

  newMessage.appendChild(botLabel);
  newMessage.appendChild(messageContent);
  chatContainer.appendChild(newMessage);
}

let selectedBot = { name: "", type: "" };

function displayBotNames(bots, container, type) {
  container.innerHTML = "";

  let botNameElement = document.getElementById("botName");
  let botImageElement = document.getElementById("botImage");

  botImageElement.style.display = "none";

  bots.forEach((bot, index) => {
    const label = document.createElement("label");
    const botRadio = document.createElement("input");
    botRadio.type = "radio";
    botRadio.name = "botSelection";
    botRadio.value = index;

    label.appendChild(botRadio);
    label.appendChild(document.createTextNode(bot.name));
    container.appendChild(label);

    botRadio.addEventListener("change", function () {
      if (botRadio.checked) {
        botNameElement.textContent = bot.name;
        botImageElement.src = bot.image;
        botImageElement.alt = bot.name;
        botImageElement.style.display = "block";

        // Track the selected bot's name and type
        selectedBot.name = bot.name;
        selectedBot.type = type; // Correctly assign the bot type
      }
    });
  });
}

// Continue with your existing sendMsgAction function
async function sendMsgAction() {
  let sendMessage = document.getElementById("sendMessage");
  let mainChatMessage = document.getElementById("mainChatMessage");
  let userMessage = document.getElementById("userMessage");

  sendMessage.addEventListener("click", async function (event) {
    event.preventDefault();

    sendSound.play();
    let message = userMessage.value;

    if (message.trim() !== "") {
      displayUserMessage(message, mainChatMessage);
      userMessage.value = "";

      try {
        let botResponse = await getBotMessage(message);
        displayBotMessage(botResponse, mainChatMessage);
      } catch (error) {
        console.error("Failed to get bot message:", error);
        displayBotMessage(
          "Sorry, something went wrong. Please try again.",
          mainChatMessage
        );
      }
    }
  });
}
