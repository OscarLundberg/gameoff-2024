import { Vec3 } from "./engine/vector.js";
import { createChunk } from "./gameobjects/chunk.js";
import spritesheet from "./images/tileset2.png?url";
import Phaser from "phaser";
import { Seed } from "./utils/seed.js";

class Example extends Phaser.Scene {
  constructor() {
    super();
    Seed.init();
  }

  preload() {
    this.load.spritesheet({
      key: "tiles",
      url: spritesheet,
      frameConfig: { frameWidth: 298, frameHeight: 298, margin: 4, startFrame: 0, spacing: 0 }
    });
  }

  create() {
    createChunk(new Vec3(0, 0, 0), this);
    // createChunk(new Vec3(1, 0, 0), this);
    // createChunk(new Vec3(0, 1, 0), this);
    // createChunk(new Vec3(1, 1, 0), this);
  }

  update() {
    this.cameras.main.x += 1;
  }
}


new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000088',
  parent: 'phaser-example',
  scene: Example
});