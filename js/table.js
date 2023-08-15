import * as PIXI from "pixi.js";
import Hand from "./classes/Hand.js";

export default function createTable() {
  //Create Pixi App
  const gameTableContainer = document.getElementById("game-table");

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    width: gameTableContainer.offsetWidth * 0.995,
    height: gameTableContainer.offsetHeight * 0.8,
  });

  gameTableContainer.appendChild(app.view);

  const hand = new Hand(app);

  //later, the Hand gets the Cards from the deck
  const cardPaths = [
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf1.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf2.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf3.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf4.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf5.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf6.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf7.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf8.png",
    "../assets/images/cardsNew/LARGE_CARD_TEMPLATEf9.png",
  ];

  cardPaths.forEach((path) => {
    hand.addCard(path);
  });
}
