import * as uiElements from "./js/uiElements.js";

await uiElements.loadUiElements();

document.getElementById("zone-button").addEventListener("click", () => {
  window.location.href = "./pages/zone.html";
});
