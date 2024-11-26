import { Vec2 } from "./engine/vector.js";
import { setChunksInView, shouldChunksChange } from "./gameobjects/chunk.js";
import { LevelData, LevelGenerator } from "./gameobjects/levelgenerator.js";
import spritesheet from "./images/tileset2.png?url";
import Phaser, { Physics } from "phaser";
import { Player } from "./player.js";

let prevPosition = { x: Infinity, y: Infinity };
let player: Player;
let level: LevelData;
let actors: Phaser.GameObjects.Group;
function statusReport(str: string) {
  console.log(str);
}

class Example extends Phaser.Scene {
  A_KEY: Phaser.Input.Keyboard.Key;
  D_KEY: Phaser.Input.Keyboard.Key;
  W_KEY: Phaser.Input.Keyboard.Key;
  S_KEY: Phaser.Input.Keyboard.Key;
  constructor() {
    super();

  }

  async preload() {
    this.load.spritesheet({
      key: "tiles",
      url: spritesheet,
      frameConfig: { frameWidth: 298, frameHeight: 298, margin: 4, startFrame: 0, spacing: 0 }
    });
    level = await new LevelGenerator("123292823").generateLevel(24, statusReport);

  }

  create() {
    player = new Player(this);
    actors = this.add.group(player, { runChildUpdate: true })
    this.cameras.main.setScroll(player.x, player.y);
  }

  update() {
    const cameraPos = new Phaser.Math.Vector2(this.cameras.main.scrollX, this.cameras.main.scrollY);
    const cameraTarget = this.cameras.main.getScroll(player.x, player.y)
    const cameraCurrentPos = Phaser.Math.LinearXY(cameraPos, cameraTarget, 0.05);
    this.cameras.main.setScroll(cameraCurrentPos.x, cameraCurrentPos.y);

    if (shouldChunksChange(prevPosition, cameraCurrentPos)) {
      setChunksInView(this, level);
    }

    prevPosition = cameraCurrentPos;
  }
}


new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  scene: Example,
  physics: {
    default: 'matter',
    matter: {
      debug: true
    }
  }
});