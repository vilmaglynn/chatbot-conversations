document.addEventListener("DOMContentLoaded", function () {
  // Select the form
  const form = document.getElementById("botgender");
  // Get references to the images
  const images = {
    female: document.getElementById("female"),
    male: document.getElementById("male"),
    other: document.getElementById("other")
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
