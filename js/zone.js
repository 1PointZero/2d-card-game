import * as uiElements from "./uiElements.js";

// load footer
await uiElements.loadUiElements();

//Start 1D Game
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((gridItem) => {
  gridItem.addEventListener("click", () => {
    const selectedLevel = gridItem.getAttribute("data-level");
    window.location.href = `./level.html?level=${selectedLevel}`;
  });
});

//start 2D game
document
  .getElementById("button-start-2d-game")
  .addEventListener("click", () => {
    window.location.href = "./game.html";
  });

//blurry image
function updateImageBlur() {
  const mainImage = document.querySelector(".main-image");
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const blurIntensity = 5; // You can change this value to adjust the blur intensity

  if (documentHeight > windowHeight) {
    if (scrollTop + windowHeight >= documentHeight - 5) {
      mainImage.style.filter = `blur(${blurIntensity}px)`;
    } else {
      mainImage.style.filter = "blur(0)";
    }
  } else {
    mainImage.style.filter = `blur(${blurIntensity}px)`;
  }
}

// Call updateImageBlur on page load
updateImageBlur();

// Add event listeners for scroll and resize events to update the image blur
window.addEventListener("scroll", updateImageBlur);
window.addEventListener("resize", updateImageBlur);
