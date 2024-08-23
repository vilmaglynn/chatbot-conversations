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
      { name: "VegaVixen", image: "./images/femalebots/female2.jpg" },
      { name: "NebulaNova", image: "./images/femalebots/female3.jpg" },
      { name: "QuantumQuinn", image: "./images/femalebots/female4.jpg" }
    ],
    male: [
      { name: "IronKnight", image: "/images/malebots/male1.jpg" },
      { name: "TitaniumAce", image: "/images/malebots/male2.jpg" },
      { name: "RoboRanger", image: "/images/malebots/male3.jpg" },
      { name: "SteelGuardian", image: "/images/malebots/male4.jpg" }
    ],
    other: [
      { name: "EchoPulse", image: "/images/otherbots/other1.jpg" },
      { name: "SolarSurge", image: "/images/otherbots/other2.jpg" },
      { name: "NeonSpectre", image: "/images/otherbots/other3.jpg" },
      { name: "VoidWalker", image: "/images/otherbots/other4.jpg" }
    ],
    scary: [
      { name: "OmegaDread", image: "/images/scary/scary1.jpg" },
      { name: "VoidStalker", image: "/images/scary/scary2.jpg" },
      { name: "MechaTerror", image: "/images/scary/scary3.jpg" },
      { name: "CyberReaper", image: "/images/scary/scary4.jpg" }
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

// Function to initialize voice recognition
function initializeVoiceRecognition() {
  const voiceInputButton = document.getElementById("voiceInputButton");
  voiceInputButton.addEventListener("click", function () {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert(
        "Your browser does not support speech recognition. Please use a supported browser like Chrome."
      );
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
      document.getElementById("userMessage").value =
        event.results[0][0].transcript;
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = function (event) {
      if (event.error === "no-speech") {
        alert("No speech was detected. Please try again.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  });
}

// Function to initialize background change functionality
function initializeBackgroundChange() {
  const images = [
    "/images/backgrounds/background-blue1.jpg",
    "/images/backgrounds/background-blue2.jpg",
    "/images/backgrounds/background-blue3.jpg",
    "/images/backgrounds/background-red1.jpg",
    "/images/backgrounds/background-red2.jpg",
    "/images/backgrounds/background-red3.jpg",
    "/images/backgrounds/background-white1.jpg",
    "/images/backgrounds/background-white2.jpg",
    "/images/backgrounds/background-green1.jpg"
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

function sendMsgAction() {
  let sendMessage = document.getElementById("sendMessage"); // Button element
  let mainChatMessage = document.getElementById("mainChatMessage"); // Chat area where messages will be displayed
  let userMessage = document.getElementById("userMessage"); // Textarea or input element where the user types their message

  sendMessage.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the user's message from the input/textarea
    let message = userMessage.value;

    if (message.trim() !== "") {
      // Check if the message is not just whitespace
      // Create a new div or paragraph element to hold the message
      let newMessage = document.createElement("p");

      // Create a span for the "You:" label
      let userLabel = document.createElement("span");
      userLabel.className = "user-label"; // Add a class for styling
      userLabel.textContent = "You: ";

      // Create a span for the message content
      let messageContent = document.createElement("span");
      messageContent.className = "user-message"; // Add a class for styling
      messageContent.textContent = message;

      // Append the spans to the new message
      newMessage.appendChild(userLabel);
      newMessage.appendChild(messageContent);

      // Append the new message to the main chat area
      mainChatMessage.appendChild(newMessage);

      // Clear the input/textarea after sending the message
      userMessage.value = "";
    }
  });
}
