import { scaledTileSize } from "./gameobjects/chunk";
import { levelWidth } from "./gameobjects/levelgenerator";
import { COLLISION } from "./utils/collision";

const moveSpeed = 10;
let deltaTime = 0;
let elapsed = 0;
const movespeedRight = new Phaser.Math.Vector2(-0.0000008, 0);
const movespeedLeft = new Phaser.Math.Vector2(0.0000008, 0);
const jumpForce = new Phaser.Math.Vector2(0, -0.00004);
const groundCheckOffset = new Phaser.Math.Vector2(0, 20);
const leftCheckOffset = new Phaser.Math.Vector2(-20, 0);
const rightCheckOffset = new Phaser.Math.Vector2(20, 0);

function createSensors(matter: Phaser.Physics.Matter.MatterPhysics, player: Player) {
  function createCheck(offset: Phaser.Math.Vector2, bool: "isGrounded" | "isCollidingLeft" | "isCollidingRight") {
    const sensor = matter.add.rectangle(0, 0, 5, 10, {
      isSensor: true,
      ignoreGravity: true,
      density: 0.00000001,
      collisionFilter: {
        category: COLLISION.SENSOR,
        mask: COLLISION.GROUND
      },
      position: {
        x: player.x + offset.x,
        y: player.y + offset.y
      }
    });

    const constraint = matter.constraint.create({
      bodyB: player.body as MatterJS.BodyType,
      bodyA: sensor,
      stiffness: 1,
      damping: 1,
      pointB: offset
    });
    constraint.angularStiffness = 1000;
    matter.world.add(constraint);

    sensor.onCollideActiveCallback = () => {
      player[bool] = true
    }
    sensor.onCollideEndCallback = () => {
      player[bool] = false;
    }
    return sensor;
  }

  return [
    createCheck(groundCheckOffset, "isGrounded"),
    createCheck(leftCheckOffset, "isCollidingLeft"),
    createCheck(rightCheckOffset, "isCollidingRight"),
  ]
}

export class Player extends Phaser.Physics.Matter.Sprite {
  // sprite: Phaser.Physics.Matter.Sprite;
  groundCheck: MatterJS.BodyType;
  A_KEY: Phaser.Input.Keyboard.Key;
  D_KEY: Phaser.Input.Keyboard.Key;
  W_KEY: Phaser.Input.Keyboard.Key;
  S_KEY: Phaser.Input.Keyboard.Key;
  isGrounded: boolean;
  isCollidingLeft: boolean;
  isCollidingRight: boolean;
  dir: "UP" | "DOWN" | "LEFT" | "RIGHT";

  setTarget(dir: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    this.dir = dir;
  }
  constructor(scene: Phaser.Scene) {
    super(scene.matter.world, 10, 10, "tiles", 11, {
      mass: 0.1,
      inverseMass: 1 / 0.1
    });

    this.setPosition(1024 * scaledTileSize, 0)
    this.setFixedRotation();
    this.setFriction(0.01, 0, 0)
    this.setCollisionCategory(COLLISION.OTHER);
    scene.add.existing(this);

    createSensors(scene.matter, this);

    this.setScale(0.1);
    this.A_KEY = this.scene.input.keyboard.addKey('A');
    this.D_KEY = this.scene.input.keyboard.addKey('D');
    this.W_KEY = this.scene.input.keyboard.addKey('W');
    this.S_KEY = this.scene.input.keyboard.addKey('S');
    this.A_KEY.addListener("keydown", () => this.setTarget("LEFT"))
    this.D_KEY.addListener("keydown", () => this.setTarget("RIGHT"))
    this.W_KEY.addListener("keydown", () => this.setTarget("UP"))
    this.S_KEY.addListener("keydown", () => this.setTarget("DOWN"))
  }

  override update(...args: any[]): void {
    if (this.A_KEY.isDown) {
      this.applyForce(movespeedRight)
    }
    if (this.D_KEY.isDown) {
      this.applyForce(movespeedLeft)
    }
    if (this.W_KEY.isDown && this.isGrounded) {
      this.applyForce(jumpForce);
    }
    if (this.S_KEY.isDown) {
    }
  }

}