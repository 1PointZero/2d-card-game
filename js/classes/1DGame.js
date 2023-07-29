import Deck from "./1DDeck.js";
export default class Game {
  constructor(zone, level, rounds, resources) {
    //general Game Settings
    this.zone = zone;
    this.level = level;
    this.rounds = rounds;
    this.resources = resources;

    //get Cards
    this.deck = new Deck(zone, level);

    //UI
    this.currentRound = 0;
    this.cardContainer = document.getElementById("card-container");
    this.actionAButton = document.getElementById("action-a");
    this.actionBButton = document.getElementById("action-b");
    this.nextRoundButton = document.getElementById("next-round");
    this.endGameButton = document.getElementById("end-game");
  }

  start() {
    this.bindEvents();
    this.nextRound();
  }

  async loadGame() {
    await this.deck.loadCards();
  }

  bindEvents() {
    this.nextRoundButton.addEventListener("click", () => {
      this.nextRound();
    });
    // Add event listener for the end game button
    this.endGameButton.addEventListener("click", () => {
      this.endGame();
    });
  }

  updateUI(card) {
    this.cardContainer.style.display = "block";
    // ..//assets muss angegeben werden weil sich die refereny auf das HTML element bezieht, welches nun in pages liegt
    this.cardContainer.style.backgroundImage = `url('../assets/images/cards/${card.data.properties.zone}/${card.data.properties.level}/${card.data.image.name}')`;
    this.actionAButton.style.display = "block";
    this.actionBButton.style.display = "block";
    this.nextRoundButton.style.display = "block";
  }

  updateBinding(card) {
    // Remove previous event listeners
    this.actionAButton.removeEventListener("click", this.actionACallback);
    this.actionBButton.removeEventListener("click", this.actionBCallback);

    // Add new event listeners
    this.actionACallback = () => {
      card.performActionA();
    };
    this.actionBCallback = () => {
      card.performActionB();
    };
    this.actionAButton.addEventListener("click", this.actionACallback);
    this.actionBButton.addEventListener("click", this.actionBCallback);
  }

  nextRound() {
    if (
      this.currentRound >= this.rounds ||
      this.deck.cardsData.length == this.rounds
    ) {
      // End the game
      this.endGame();
      return;
    }

    const card = this.deck.drawCard(this.resources);
    if (!card) {
      // No more cards available, end the game
      this.endGame();
      return;
    }

    this.updateBinding(card);
    this.updateUI(card);

    this.currentRound++;
  }

  endGame() {
    this.endGameButton.style.display = "block";

    // Hide the card and action buttons
    document.getElementById("card-container").style.display = "none";
    document.getElementById("action-a").style.display = "none";
    document.getElementById("action-b").style.display = "none";
    document.getElementById("next-round").style.display = "none";

    // Redirect to the starting screen or show a game-over screen
    this.endGameButton.addEventListener("click", () => {
      window.location.href = "zone.html";
    });
  }
}
