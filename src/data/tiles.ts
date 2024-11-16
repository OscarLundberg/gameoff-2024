import { Vec2 } from "../engine/vector.js";
export enum Tiles {
  Rock,
  Clay,
  Limestone,
  Sandstone,
  Brownrock,
  Pinkstone,
  Blackrock,
  Dirt,
  Emerald,
  Ruby,
  Sand,
  Magicblock,
  Sapphire,
  Gold
}

export const SpriteCoordinate = {
  [Tiles.Rock]: [
    new Vec2(0, 0),
    new Vec2(2, 1),
    new Vec2(3, 1),
    new Vec2(0, 2),
    new Vec2(1, 2)
  ],
  [Tiles.Clay]: [new Vec2(1, 0)],
  [Tiles.Limestone]: [new Vec2(2, 0)],
  [Tiles.Sandstone]: [new Vec2(3, 0)],
  [Tiles.Brownrock]: [new Vec2(4, 0)],
  [Tiles.Pinkstone]: [new Vec2(5, 0)],
  [Tiles.Blackrock]: [new Vec2(0, 1)],
  [Tiles.Dirt]: [new Vec2(1, 1)],
  [Tiles.Emerald]: [new Vec2(4, 1)],
  [Tiles.Ruby]: [new Vec2(5, 1)],
  [Tiles.Sand]: [new Vec2(2, 2)],
  [Tiles.Magicblock]: [new Vec2(3, 2)],
  [Tiles.Sapphire]: [new Vec2(4, 2)],
  [Tiles.Gold]: [new Vec2(5, 2)],
}