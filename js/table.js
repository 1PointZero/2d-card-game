import * as PIXI from "pixi.js";
import Hand from "./classes/Hand.js";

export default function createTable() {
  //Create Pixi App
  const gameTableContainer = document.getElementById("game-table");

  const app = new PIXI.Application({
    background: "#1099bb",
    width: gameTableContainer.offsetWidth * 0.995,
    height: gameTableContainer.offsetHeight * 0.8,
  });

  gameTableContainer.appendChild(app.view);

  const hand = new Hand(app);

  //later, the Hand gets the Cards from the deck
  const cardPaths = [
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
    "../assets/CardTemplate.png",
  ];

  cardPaths.forEach((path) => {
    hand.addCard(path);
  });
}
