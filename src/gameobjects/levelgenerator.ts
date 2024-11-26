import { createNoise2D } from "simplex-noise"
import { Seed } from "../utils/seed"
import { Tiles } from "../data/tiles";


const heightScale = 20; // Keep initial scale
const noiseScale = 0.02; // Base noise scale
const dirtLayer = 45; // Base dirt layer height
const fade = 5; // Random variation for layer transitions
const levelHeight = 512; // Height of the level
export const levelWidth = 8192; // Width of the level
const noiseOffset = 5; // Offset for generating noise
const octaves = 8; // Number of octaves for layered noise
const persistence = 0.2; // Amplitude multiplier per octave
const lacunarity = 2.2; // Frequency multiplier per octave

export class LevelGenerator {
  SEED: Seed;
  constructor(private seed = "abc123") {
    this.SEED = Seed.init(seed);
  }

  async generateLevel(size = 24, statusReport: (status: string, progress: number) => void): Promise<LevelData> {
    const noise = createNoise2D(() => this.SEED.nextFloat(0, 1));
    let tiles: TileData[][] = [];
    tiles = Array(levelWidth);

    for (let i = 0; i < levelWidth; i++) {
      tiles[i] = Array(levelHeight);

      // Generate multi-octave noise
      let noiseVal = 0;
      let amplitude = 1;
      let frequency = noiseScale;
      let maxAmplitude = 0;

      for (let o = 0; o < octaves; o++) {
        noiseVal += (noise(i * frequency, noiseOffset * frequency) + 1) / 2 * amplitude;
        maxAmplitude += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
      }

      noiseVal /= maxAmplitude; // Normalize noise value
      const scale = Math.round(noiseVal * heightScale);

      const fadeValue = this.SEED.next(0, fade);

      for (let j = 0; j < levelHeight; j++) {
        const tile: Partial<TileData> = {};
        if (j < scale) {
          tile.type = Tiles.Empty;
        } else if (j < dirtLayer + fadeValue) {
          tile.type = Tiles.Dirt;
        } else {
          tile.type = Tiles.Rock;
        }
        tiles[i][j] = tile as TileData;
      }
    }
    return {
      tiles,
      getChunk(x: number, y: number) {
        const chunk: TileData[][] = [];
        const _x = x * size;
        const _y = y * size;
        if (tiles.length <= _x + size || tiles[0].length <= _y + size || _x < 0 || _y < 0) {
          return null;
        }
        for (let i = 0; i < size; i++) {
          const row: TileData[] = [];
          for (let j = 0; j < size; j++) {
            // Check if the requested element is within the bounds of the input array
            row.push(tiles[(x * size) + i][(y * size) + j]);
          }
          chunk.push(row);
        }
        return chunk;
      }
    }
  }

}

export type TileData = {
  type: Tiles,
  spriteIdx: number;
}


export type LevelData = {
  tiles: TileData[][];
  getChunk(x: number, y: number): TileData[][];
}