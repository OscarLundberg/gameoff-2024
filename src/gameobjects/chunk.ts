import { SpriteCoordinate, Tiles } from '../data/tiles.js';
import { probabilityTable } from '../utils/probability.js';
import { Seed } from '../utils/seed.js';
import { Vec3 } from '../engine/vector.js';


const table = probabilityTable([
  [50, Tiles.Rock],
  [10, Tiles.Blackrock],
  [10, Tiles.Sandstone]
]);

const chunkSize = 16;
const tileSize = 298;
const tileScale = 0.2;
const scaledTileSize = tileSize * tileScale;
const chunkTotalSize = chunkSize * scaledTileSize;
export function createChunk(position: Vec3, scene: Phaser.Scene) {
  const seed = Seed.extend(`${position.x}-${position.y}`)
  const biome = table.getRandom(seed);
  const sprite = SpriteCoordinate[biome][0];

  const group = scene.add.group();
  for (let i = 0; i < chunkSize; i++) {
    for (let j = 0; j < chunkSize; j++) {
      const xoffset = position.x * chunkTotalSize;
      const yoffset = position.y * chunkTotalSize;
      const x = xoffset + (i * scaledTileSize);
      const y = yoffset + (j * scaledTileSize);

      const img = new Phaser.GameObjects.Image(scene, x, y, 'tiles', sprite.x);
      img.setScale(tileScale);
      group.add(img);
    }
  }
  
};


