import Phaser from "phaser";

export default class World extends Phaser.Scene {
  constructor() {
    super({ key: "World" });
  }

  preload() {
    for (let i = 1; i <= 13; i++) {
      this.load.image(
        `block${i}`,
        `../../assets/images/tileTesting/Tile${i}.png`
      );
    }
  }

  create() {
    this.input.mouse.disableContextMenu();

    const widthOffset = 64 * 3.125 * 1.1 + 0;
    const heightOffset = 37 * 3.125 * 1.1 + 0; // tan(30°)x64    //3.125 for 400

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // Randomly choose an image key
        const imageKey = `block${Phaser.Math.Between(1, 13)}`;

        const block = this.add
          .image((i - j) * widthOffset, (i + j) * heightOffset, imageKey) // Using new offsets
          .setScale(1);
        block.setInteractive();

        // Define the isometric hit area
        // // Define the isometric hit area
        // const hitArea = new Phaser.Geom.Polygon([
        //   new Phaser.Geom.Point(128, 32), // bottom of the isometric block
        //   new Phaser.Geom.Point(128, 32 + heightOffset), // right corner
        //   new Phaser.Geom.Point(0, 32 + 2 * heightOffset), // top
        //   new Phaser.Geom.Point(0, 32 + heightOffset), // left corner
        // ]);

        // block.setInteractive(hitArea, Phaser.Geom.Polygon.Contains);

        // Event handler for hover effect
        block.on("pointerover", () => {
          block.y -= 10;
        });

        block.on("pointerout", () => {
          block.y += 10;
        });
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
        this.cameras.main.zoom *= 1.2;
      } else {
        this.cameras.main.zoom /= 1.2;
      }
      // clamp the zoom to reasonable values
      this.cameras.main.zoom = Phaser.Math.Clamp(
        this.cameras.main.zoom,
        0.5,
        1.2
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
