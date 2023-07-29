import Card from "./1DCard.js";
export default class Deck {
  constructor(zone, level) {
    this.cardsData = [];
    // this.usedCardIds = new Set();
    this.zone = zone;
    this.level = level;
    this.cardsLeft = [];
  }

  async loadCards() {
    const response = await fetch("/assets/cards.json");
    const cardsData = await response.json();
    this.cardsData = cardsData.cards.filter(
      (cardData) =>
        cardData.properties.zone === this.zone &&
        cardData.properties.level === this.level
    );
    this.cardsLeft = [...this.cardsData];
  }

  drawCard(resources) {
    // If no more cards are available, return null
    if (this.cardsLeft.length === 0) {
      return null;
    }

    // Calculate the probabilities based on the resources parameter
    const calculateProbabilities = (resources, cardsLeft) => {
      return new Array(cardsLeft.length).fill(1 / cardsLeft.length);
    };

    const probabilities = calculateProbabilities(resources, this.cardsLeft);

    // Draw a card based on the calculated probabilities
    const chosenIndex = this.getRandomIndexWithProbabilities(probabilities);
    const chosenCardData = this.cardsLeft[chosenIndex];

    // Remove the chosen card from cardsLeft
    this.cardsLeft.splice(chosenIndex, 1);

    // Create a Card instance from the chosen card data
    const chosenCard = new Card(chosenCardData);

    return chosenCard;
  }

  getRandomIndexWithProbabilities(probabilities) {
    const randomValue = Math.random();
    let accumulatedProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
      accumulatedProbability += probabilities[i];
      if (randomValue <= accumulatedProbability) {
        return i;
      }
    }

    return probabilities.length - 1;
  }
}
