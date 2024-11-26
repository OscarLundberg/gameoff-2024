import { SpriteCoordinate, Tiles } from '../data/tiles.js';
import { Vec3 } from '../engine/vector.js';
import { LevelData, TileData } from './levelgenerator.js';

function roundAwayFromZero(num: number) {
  return num < 0 ? -Math.round(-num) : Math.round(num);
}

const chunkSize = 8;
const tileSize = 298;
const tileScale = 0.1875;
export const scaledTileSize = tileSize * tileScale;
export const chunkTotalSize = chunkSize * scaledTileSize;
export function createChunk(position: Vec3, scene: Phaser.Scene, level: TileData[][]) {

  const group = scene.add.group();
  for (let i = 0; i < chunkSize; i++) {
    for (let j = 0; j < chunkSize; j++) {
      const tile = level[i][j];
      if (tile.type == Tiles.Empty) { continue; }
      const sprites = SpriteCoordinate[tile.type];
      const xoffset = position.x;
      const yoffset = position.y;
      const x = xoffset + (i * scaledTileSize);
      const y = yoffset + (j * scaledTileSize);
      const img = scene.matter.add.sprite(x + scaledTileSize / 2, y + scaledTileSize / 2, "tiles", sprites[0], { isStatic: true });
      // img.setIgnoreGravity()
      img.setScale(tileScale);
      group.add(img);
    }
  }
  return group;
};


export const loadedChunks: Record<string, Phaser.GameObjects.Group> = {};

function getAddress(x: number, y: number) {
  return `${x} ${y}`;
}


function loadChunk(scene: Phaser.Scene, x: number, y: number, level: LevelData) {
  let addr = getAddress(x, y);
  const pos = new Vec3(x * chunkTotalSize, y * chunkTotalSize, 0);
  let chunk = level.getChunk(x, y);
  if (chunk) {
    loadedChunks[addr] = createChunk(pos, scene, chunk);
  }
}

function unloadChunk(addr: string);
function unloadChunk(x: number, y: number);
function unloadChunk(x: number | string, y?: number) {
  let addr: string;
  if (typeof x == "string") {
    addr = x;
  } else {
    addr = getAddress(x, y);
  }
  loadedChunks[addr].destroy(true, true);
  delete loadedChunks[addr];
}


export function shouldChunksChange(prev: { x: number, y: number }, cur: { x: number, y: number }) {
  const prevFirstHorizontalChunk = roundAwayFromZero(prev.x / chunkTotalSize);
  const prevFirstVerticalChunk = roundAwayFromZero(prev.y / chunkTotalSize);
  const curFirstHorizontalChunk = roundAwayFromZero(cur.x / chunkTotalSize);
  const curFirstVerticalChunk = roundAwayFromZero(cur.y / chunkTotalSize);
  return (prevFirstHorizontalChunk != curFirstHorizontalChunk) || (prevFirstVerticalChunk != curFirstVerticalChunk);
}

export function setChunksInView(scene: Phaser.Scene, level: LevelData) {
  const x = scene.cameras.main.scrollX;
  const y = scene.cameras.main.scrollY;
  const w = scene.game.canvas.width;
  const h = scene.game.canvas.height;
  const horizontalChunks = Math.ceil(w / chunkTotalSize);
  const firstHorizontalChunk = roundAwayFromZero(x / chunkTotalSize);
  const verticalChunks = Math.ceil(h / chunkTotalSize);
  const firstVerticalChunk = roundAwayFromZero(y / chunkTotalSize);
  let chunks = new Set(Object.keys(loadedChunks));

  for (let i = -2; i < horizontalChunks + 2; i++) {
    for (let j = -2; j < verticalChunks + 1; j++) {
      const x = firstHorizontalChunk + i;
      const y = firstVerticalChunk + j;
      const addr = getAddress(x, y);
      if (chunks.has(addr)) {
        chunks.delete(addr);
      } else {
        loadChunk(scene, x, y, level);
      }
    }
  }

  chunks.forEach(chunkToUnload => unloadChunk(chunkToUnload));
}
