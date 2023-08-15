import * as uiElements from "./uiElements.js";
import World from "./classes/World.js";
import * as PIXI from "pixi.js";
import Hand from "./classes/Hand.js";
import CreateTable from "./table.js";

// load footer
await uiElements.loadUiElements();

//load Game

//create 2D Game map
const gameWorld = document.getElementById("game-world");
const config = {
  type: Phaser.AUTO,
  parent: "game-world",
  backgroundColor: "#3d3a4c", // "#88aadd", // set a nice blue color here
  width: gameWorld.offsetWidth * 0.995,
  height: gameWorld.offsetHeight * 0.995,
  scene: [World],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
};

const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
  game.scale.resize(gameWorld.offsetWidth, gameWorld.offsetHeight * 0.995);
});

CreateTable();
