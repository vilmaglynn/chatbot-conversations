// const apiUrl2 =
//   "https://chatbotconversations.netlify.app/.netlify/functions/chat";

// const apiUrl2 = "/.netlify/functions/chat"; // This should work both locally and in production

//Replace with your actual Wit.ai API URL and Server Access Token
const apiUrl = "https://api.wit.ai/message";
const API_KEY = "AGVSYOU4JJDPYJURPZIPZVGLCZRHGTEQ";

async function getBotResponse(message) {
  try {
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(message)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Wit.ai Response:", data);

    // Extract the bot's response from Wit.ai's response (the exact structure may vary)
    const botMessage = data.text || "Sorry, I couldn't understand that.";
    return botMessage;
  } catch (error) {
    console.error("Error fetching the bot response:", error);
    return "Sorry, I couldn't process your request. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions on DOMContentLoaded
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
        displayBotNames(selectedCategory, botNamesContainer);
      }
    });
  });
}

// Returns an object containing bot categories
function getBotCategories() {
  return {
    cartoon: [
      { name: "RoboSparkle", image: "./images/cartoon/cartoon1.jpg" },
      { name: "GigaGizmo", image: "./images/cartoon/cartoon2.jpg" },
      { name: "CircuitBuddy", image: "./images/cartoon/cartoon3.jpg" },
      { name: "PixelBot", image: "./images/cartoon/cartoon4.jpg" }
    ],
    female: [
      { name: "CyberLuna", image: "./images/femalebots/female1.jpg" },
      { name: "SeraphinaByte", image: "./images/femalebots/female2.jpg" },
      { name: "NebulaNova", image: "./images/femalebots/female3.jpg" },
      { name: "KatarinaQuantum", image: "./images/femalebots/female4.jpg" }
    ],
    male: [
      { name: "IronKnightB12", image: "./images/malebots/male1.jpg" },
      { name: "TitaniumAce67", image: "./images/malebots/male2.jpg" },
      { name: "RoboRanger170", image: "./images/malebots/male3.jpg" },
      { name: "SteelGuardianE23", image: "./images/malebots/male4.jpg" }
    ],
    other: [
      { name: "EchoPython", image: "./images/otherbots/other1.jpg" },
      { name: "PascalSurge", image: "./images/otherbots/other2.jpg" },
      { name: "OracleSpectre", image: "./images/otherbots/other3.jpg" },
      { name: "CobolWalker", image: "./images/otherbots/other4.jpg" }
    ],
    scary: [
      { name: "OmegaDread", image: "./images/scary/scary1.jpg" },
      { name: "HidargoT9675", image: "./images/scary/scary2.jpg" },
      { name: "CazTerTerror", image: "./images/scary/scary3.jpg" },
      { name: "CyberReaper", image: "./images/scary/scary4.jpg" }
    ]
  };
}

// Create and return a container for bot names
function createBotNamesContainer() {
  const container = document.createElement("div");
  document.getElementById("settingsHide").appendChild(container);
  return container;
}

// Function to display bot names as radio buttons & on image container + image
function displayBotNames(bots, container) {
  container.innerHTML = "";

  let botNameElement = document.getElementById("botName");
  let botImageElement = document.getElementById("botImage");

  // Ensure the botImageElement is initially hidden
  botImageElement.style.display = "none"; // This will ensure it starts hidden

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

        // Show the image when a radio button is selected
        botImageElement.style.display = "block";
      }
    });
  });
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

async function sendMsgAction() {
  let sendMessage = document.getElementById("sendMessage");
  let mainChatMessage = document.getElementById("mainChatMessage");
  let userMessage = document.getElementById("userMessage");

  sendMessage.addEventListener("click", async function (event) {
    event.preventDefault();

    sendSound.play();
    let message = userMessage.value;

    if (message.trim() !== "") {
      // Display user's message
      displayUserMessage(message, mainChatMessage);

      // Clear the input/textarea after sending the message
      userMessage.value = "";

      // Get bot's response
      try {
        let botResponse = await getBotMessage(message);

        // Display bot's response
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
