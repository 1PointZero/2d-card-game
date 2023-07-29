import Game1D from "./classes/1DGame.js";
import * as uiElements from "./uiElements.js";

await uiElements.loadUiElements();

function getLevelFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("level");
}

// Old 1D Game
const zone = "zone1";
const level = getLevelFromUrl(); //|| "level1";
const rounds = 4;
const resources = {};

const game = new Game1D(zone, level, rounds, resources);

game.loadGame().then(() => {
  game.start();
});
