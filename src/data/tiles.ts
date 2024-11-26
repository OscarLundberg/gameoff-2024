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
  Gold,
  Empty
}

export const SpriteCoordinate = {
  [Tiles.Rock]: [
    0,
    8,
    9,
    12,
    13
  ],
  [Tiles.Clay]: [1],
  [Tiles.Limestone]: [2],
  [Tiles.Sandstone]: [3],
  [Tiles.Brownrock]: [4],
  [Tiles.Pinkstone]: [5],
  [Tiles.Blackrock]: [6],
  [Tiles.Dirt]: [7],
  [Tiles.Emerald]: [10],
  [Tiles.Ruby]: [11],
  [Tiles.Sand]: [14],
  [Tiles.Magicblock]: [15],
  [Tiles.Sapphire]: [16],
  [Tiles.Gold]: [17],
}