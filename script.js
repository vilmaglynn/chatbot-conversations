// Function to speak the bot's message using the assigned voice
function speakBotMessage(message) {
  // Ensure voices are loaded
  const voices = speechSynthesis.getVoices();

  const botCategories = getBotCategories();
  const botCategory = botCategories[selectedBot.type];
  const selectedBotData = botCategory.find(
    (bot) => bot.name === selectedBot.name
  );
  const voiceName = selectedBotData.voiceName;

  const selectedVoice = voices.find((voice) => voice.name === voiceName);

  if (selectedVoice) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9; // Adjust speed if needed
    utterance.pitch = 1; // Adjust pitch if needed
    speechSynthesis.speak(utterance);
  } else {
    console.error("Voice not found:", voiceName);
  }
}

// Trigger the voiceschanged event and cache voices immediately
window.addEventListener("load", () => {
  speechSynthesis.getVoices(); // Load voices immediately on page load
});

// Initialize the bot selection and other functions after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeBotSelection();
  initializeVoiceRecognition();
  initializeBackgroundChange();
  initializeSettingsToggle();
  deleteMsgAction();
  sendMsgAction();
  speechSynthesis.getVoices(); // Also load voices here just to be sure
});

// Create and return a container for bot names
function createBotNamesContainer() {
  const container = document.createElement("div");
  document.getElementById("settingsHide").appendChild(container);
  return container;
}

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

async function getBotMessage(userMessage) {
  if (!selectedBot.name || !selectedBot.type) {
    return "No bot selected. Please select a bot before sending a message.";
  }

  try {
    const response = await fetch("/.netlify/functions/getChatResponse", {
      method: "POST",
      body: JSON.stringify({
        userMessage,
        selectedBotName: selectedBot.name,
        selectedBotType: selectedBot.type
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return `Error: ${error.message || response.status}`;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to get bot message:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

function speakBotMessage(message) {
  // Ensure voices are loaded
  const voices = speechSynthesis.getVoices();

  const botCategories = getBotCategories();
  const botCategory = botCategories[selectedBot.type];
  const selectedBotData = botCategory.find(
    (bot) => bot.name === selectedBot.name
  );
  const voiceName = selectedBotData.voiceName;

  const selectedVoice = voices.find((voice) => voice.name === voiceName);

  if (selectedVoice) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9; // Adjust speed if needed
    utterance.pitch = 1; // Adjust pitch if needed

    // Start sound wave animation
    const soundWaveBars = document.querySelectorAll(".sound-wave-bar");
    soundWaveBars.forEach((bar) => {
      bar.style.animationPlayState = "running"; // Start the animation
    });

    utterance.onend = function () {
      // Stop sound wave animation when speaking ends
      soundWaveBars.forEach((bar) => {
        bar.style.animationPlayState = "paused"; // Pause the animation
      });
    };

    speechSynthesis.speak(utterance);
  } else {
    console.error("Voice not found:", voiceName);
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

// function displayBotMessage(message, chatContainer) {
//   let newMessage = document.createElement("p");

//   let botLabel = document.createElement("span");
//   botLabel.className = "bot-label";

//   // Use the bot's name dynamically
//   botLabel.textContent = `${selectedBot.name}: `;

//   let messageContent = document.createElement("span");
//   messageContent.className = "bot-message";
//   messageContent.textContent = message;

//   newMessage.appendChild(botLabel);
//   newMessage.appendChild(messageContent);
//   chatContainer.appendChild(newMessage);
// }

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

      // Scroll to the bottom after adding the user's message
      scrollToBottom(mainChatMessage);

      try {
        let botResponse = await getBotMessage(message);
        displayBotMessage(botResponse, mainChatMessage);

        // Scroll to the bottom after adding the bot's response
        scrollToBottom(mainChatMessage);
      } catch (error) {
        console.error("Failed to get bot message:", error);
        displayBotMessage(
          "Sorry, something went wrong. Please try again.",
          mainChatMessage
        );

        // Scroll to the bottom even if there is an error
        scrollToBottom(mainChatMessage);
      }
    }
  });
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

//==============
function displayBotMessage(message, chatContainer) {
  let newMessage = document.createElement("p");

  let botLabel = document.createElement("span");
  botLabel.className = "bot-label";

  botLabel.textContent = `${selectedBot.name}: `;

  let messageContent = document.createElement("span");
  messageContent.className = "bot-message";
  messageContent.textContent = message;

  newMessage.appendChild(botLabel);
  newMessage.appendChild(messageContent);
  chatContainer.appendChild(newMessage);

  // Speak the bot's message
  speakBotMessage(message);
}

// Ensure the voices are loaded
speechSynthesis.onvoiceschanged = function () {
  const voices = speechSynthesis.getVoices();
  voices.forEach((voice, index) => {
    console.log(
      `${index + 1}: Name: ${voice.name}, Lang: ${voice.lang}, URI: ${
        voice.voiceURI
      }`
    );
  });
};

// Trigger the voiceschanged event to load voices
speechSynthesis.getVoices();
