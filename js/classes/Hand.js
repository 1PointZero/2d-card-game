import * as PIXI from "pixi.js";

export default class Hand {
  constructor(app) {
    this.cards = [];
    this.app = app;
    this.container = new PIXI.Container();
    // this.container.sortableChildren = true; // Allows for container's children to have a z-Index
    this.app.stage.addChild(this.container);

    this.height = 150;
    this.width = 150;

    // will be a normal button later!!!
    // Create a button to toggle view
    this.toggleButton = new PIXI.Graphics();
    this.toggleButton.beginFill(0xff0000); // Red color for our button
    this.toggleButton.drawRect(0, 0, 100, 50); // Drawing a rectangle for the button
    this.toggleButton.endFill();
    this.toggleButton.x = this.app.screen.width - 110; // Positioning the button
    this.toggleButton.y = 10;
    this.toggleButton.interactive = true;
    this.toggleButton.buttonMode = true;

    // Text for the button
    const buttonText = new PIXI.Text("Toggle View", {
      fontFamily: "Arial",
      fontSize: 14,
      fill: 0xffffff,
    });
    buttonText.anchor.set(0.5, 0.5);
    buttonText.position.set(50, 25);
    this.toggleButton.addChild(buttonText);

    this.toggleButton.on("pointerup", () => this.toggleView());

    this.app.stage.addChild(this.toggleButton);

    this.ticker = new PIXI.Ticker();
  }

  addDeck() {
    // add a Deck of Card Objects to the Hand (could)
  }

  animateCard(card, targetX, targetY) {
    const speed = 0.1; // Adjust this for faster or slower movement

    // This function will get called on every frame until the card reaches its target position
    const animate = () => {
      const dx = targetX - card.x;
      const dy = targetY - card.y;

      // If the card is close enough to the target position, stop the animation
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        this.ticker.remove(animate);
        card.x = targetX;
        card.y = targetY;
        return;
      }

      // Move the card by a fraction of the remaining distance
      card.x += dx * speed;
      card.y += dy * speed;
    };

    // Add the animate function to the ticker to call it on every frame
    this.ticker.add(animate);
  }

  addCard(texture) {
    const card = PIXI.Sprite.from(texture);
    card.anchor.set(0.5);
    card.height = this.height;
    card.width = this.width;

    card.interactive = true;

    card.on("pointerover", () => {
      card.y -= 10; // Move up by 20 pixels on hover
      card.zIndex = 10;
    });

    card.on("pointerout", () => {
      card.y += 10; // Move back to original position when mouse leaves
      card.zIndex = 0;
    });

    this.cards.push(card);
    this.container.addChild(card);
    this.arrangeCards();
  }

  toggleView() {
    this.isDeckView = !this.isDeckView;
    this.arrangeCards();
  }

  arrangeCards() {
    if (this.isDeckView) {
      this.stackCardsLikeDeck();
    } else {
      this.arrangeInGrid();
    }
  }

  arrangeInGrid() {
    const centerX = 70;
    const centerY = 70;

    const cardWidth = this.height * 0.65;
    const cardHeight = this.width * 0.85;
    const gap = 0;

    this.cards.forEach((card, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      card.x = centerX + col * (cardWidth + gap);
      card.y = centerY + row * (cardHeight + gap);
    });
  }

  stackCardsLikeDeck() {
    const deckX = 70;
    const deckY = 70;
    const offset = 2; // Pixel offset for stacking like a deck

    this.cards.forEach((card, index) => {
      card.x = deckX + index * offset;
      card.y = deckY + index * offset;
    });
  }
}
