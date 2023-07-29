import Phaser from "phaser";

export default class World extends Phaser.Scene {
  constructor() {
    super({ key: "World" });
  }

  preload() {
    this.load.image("block", "../../assets/images/BasicTile2.png");
  }

  create() {
    this.input.mouse.disableContextMenu();
    this.isoGroup = this.add.group();

    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        const block = this.add
          .image((i - j) * 64, (i + j) * 32, "block")
          .setScale(0.115);
        block.setInteractive(); // This line makes the block interactive
        block.clicked = false;

        // Event handler for hover effect
        block.on("pointerover", () => {
          if (!block.clicked) {
            // Only move the block up if it hasn't been clicked
            block.y -= 5; // Reduced the hover effect by half
          }
        });

        block.on("pointerout", () => {
          if (!block.clicked) {
            // Only move the block back down if it hasn't been clicked
            block.y += 5; // Moves the block back down
          }
        });

        // Event handler for click effect
        block.on("pointerdown", () => {
          if (this.currentClickedBlock && this.currentClickedBlock !== block) {
            // If there's a previously clicked block and it's not the current one, move it back down
            this.currentClickedBlock.y += 5;
            this.currentClickedBlock.clicked = false;
          }

          if (block.clicked) {
            // If the block was clicked, move it back down
            block.y += 5;
            block.clicked = false;
          } else {
            // If the block wasn't clicked, move it up
            block.y -= 5;
            block.clicked = true;
          }

          this.currentClickedBlock = block;
        });

        this.isoGroup.add(block);
      }
    }

    // Set up camera controls
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.cameras.main.setBounds(0, 0, 1920, 1080); // set this to your world's actual width and height

    // Track whether the pointer is down
    this.dragPointerDown = false;

    this.input.on("pointerdown", (pointer) => {
      if (pointer.leftButtonDown() || pointer.middleButtonDown()) {
        this.dragPointerDown = true;
        this.dragX = pointer.x;
        this.dragY = pointer.y;
      }
    });

    this.input.on("pointerup", (pointer) => {
      if (pointer.upElement === this.game.canvas) {
        this.dragPointerDown = false;
      }
    });

    this.input.on("pointermove", (pointer) => {
      if (this.dragPointerDown) {
        this.cameras.main.scrollX -= pointer.x - this.dragX;
        this.cameras.main.scrollY -= pointer.y - this.dragY;
        this.dragX = pointer.x;
        this.dragY = pointer.y;
      }
    });

    this.input.on("wheel", (pointer, currentlyOver, dx, dy, dz, event) => {
      if (dy < 0) {
        this.cameras.main.zoom *= 1.1;
      } else {
        this.cameras.main.zoom /= 1.1;
      }
      // clamp the zoom to reasonable values
      this.cameras.main.zoom = Phaser.Math.Clamp(
        this.cameras.main.zoom,
        0.5,
        2
      );
    });
  }

  update() {
    const speed = 5;

    if (this.cursors.up.isDown) {
      this.cameras.main.scrollY -= speed;
    } else if (this.cursors.down.isDown) {
      this.cameras.main.scrollY += speed;
    }

    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX -= speed;
    } else if (this.cursors.right.isDown) {
      this.cameras.main.scrollX += speed;
    }
  }
}
