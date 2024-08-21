document.addEventListener("DOMContentLoaded", function () {
  // Select the form
  const form = document.getElementById("botgender");
  // Get references to the images
  const images = {
    female: document.getElementById("female"),
    male: document.getElementById("male"),
    other: document.getElementById("other"),
    scary: document.getElementById("scary"),
    cartoon: document.getElementById("cartoon")
  };

  // Listen for any change on the radio buttons
  form.addEventListener("change", function (event) {
    // Hide all images initially
    for (let key in images) {
      images[key].style.display = "none";
    }

    // Get the value of the selected radio button
    const selectedValue = event.target.value;

    // Show the corresponding image based on the selected radio button
    if (images[selectedValue]) {
      images[selectedValue].style.display = "block";
    }
  });
});

document
  .getElementById("voiceInputButton")
  .addEventListener("click", function () {
    var recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
      document.getElementById("userInput").value =
        event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
      alert("Error occurred in recognition: " + event.error);
    };
  });

// Array of image paths
const images = [
  "/images/backgrounds/background-blue3.jpg",
  "/images/backgrounds/background-blue1.jpg",
  "/images/backgrounds/background-blue2.jpg",
  "/images/backgrounds/background-red.jpg",
  "/images/backgrounds/background-white.jpg"
];

let currentIndex = 0; // Start at the first image

let background = document.getElementById("background");
background.addEventListener("click", changeBackground);

function changeBackground(event) {
  event.preventDefault(); // Keep this if the button is inside a form or an anchor tag

  console.log("clicked");

  // Get the current image
  const selectedImage = images[currentIndex];

  // Apply the current image as the background
  document.body.style.backgroundImage = `url('${selectedImage}')`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";

  // Move to the next image in the array
  currentIndex++;

  // If we've reached the end of the array, start over from the beginning
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}

// AIzaSyAjpuQ2GoKX1c3zPou9PglZp9Yn88KgxpU
