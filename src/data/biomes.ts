import { Tiles } from "./tiles";

export enum Biomes {
  RockyHighlands, // Utilizes Rock, Limestone, Brownrock, Blackrock
  DesertWastes,   // Utilizes Sand, Sandstone, Brownrock, Dirt
  GemstoneValley, // Utilizes Emerald, Ruby, Sapphire, Magicblock
  MysticForest,   // Utilizes Dirt, Clay, Magicblock, Pinkstone
  GoldenCanyon,   // Utilizes Sandstone, Gold, Brownrock, Clay
  CrystalCaverns  // Utilizes Sapphire, Emerald, Ruby, Blackrock
}

export const biomeProbabilityWeights: { [key in Biomes]: number } = {
  [Biomes.RockyHighlands]: 0.2,  
  [Biomes.DesertWastes]: 0.25,   
  [Biomes.GemstoneValley]: 0.15, 
  [Biomes.MysticForest]: 0.1,    
  [Biomes.GoldenCanyon]: 0.2,    
  [Biomes.CrystalCaverns]: 0.1   
};


export const biomeTileProbability = {
  [Biomes.RockyHighlands]: {
    [Tiles.Rock]: 0.4,
    [Tiles.Clay]: 0.1,
    [Tiles.Limestone]: 0.2,
    [Tiles.Sandstone]: 0.05,
    [Tiles.Brownrock]: 0.15,
    [Tiles.Pinkstone]: 0.02,
    [Tiles.Blackrock]: 0.08,
    [Tiles.Dirt]: 0.02,
    [Tiles.Emerald]: 0.01,
    [Tiles.Ruby]: 0.01,
    [Tiles.Sand]: 0.01,
    [Tiles.Magicblock]: 0.01,
    [Tiles.Sapphire]: 0.01,
    [Tiles.Gold]: 0.02
  },
  [Biomes.DesertWastes]: {
    [Tiles.Rock]: 0.05,
    [Tiles.Clay]: 0.05,
    [Tiles.Limestone]: 0.05,
    [Tiles.Sandstone]: 0.35,
    [Tiles.Brownrock]: 0.15,
    [Tiles.Pinkstone]: 0.02,
    [Tiles.Blackrock]: 0.02,
    [Tiles.Dirt]: 0.2,
    [Tiles.Emerald]: 0.01,
    [Tiles.Ruby]: 0.01,
    [Tiles.Sand]: 0.3,
    [Tiles.Magicblock]: 0.01,
    [Tiles.Sapphire]: 0.01,
    [Tiles.Gold]: 0.02
  },
  [Biomes.GemstoneValley]: {
    [Tiles.Rock]: 0.05,
    [Tiles.Clay]: 0.05,
    [Tiles.Limestone]: 0.02,
    [Tiles.Sandstone]: 0.02,
    [Tiles.Brownrock]: 0.03,
    [Tiles.Pinkstone]: 0.03,
    [Tiles.Blackrock]: 0.03,
    [Tiles.Dirt]: 0.02,
    [Tiles.Emerald]: 0.3,
    [Tiles.Ruby]: 0.3,
    [Tiles.Sand]: 0.01,
    [Tiles.Magicblock]: 0.1,
    [Tiles.Sapphire]: 0.3,
    [Tiles.Gold]: 0.04
  },
  [Biomes.MysticForest]: {
    [Tiles.Rock]: 0.05,
    [Tiles.Clay]: 0.15,
    [Tiles.Limestone]: 0.02,
    [Tiles.Sandstone]: 0.01,
    [Tiles.Brownrock]: 0.05,
    [Tiles.Pinkstone]: 0.1,
    [Tiles.Blackrock]: 0.02,
    [Tiles.Dirt]: 0.3,
    [Tiles.Emerald]: 0.03,
    [Tiles.Ruby]: 0.03,
    [Tiles.Sand]: 0.02,
    [Tiles.Magicblock]: 0.2,
    [Tiles.Sapphire]: 0.03,
    [Tiles.Gold]: 0.05
  },
  [Biomes.GoldenCanyon]: {
    [Tiles.Rock]: 0.05,
    [Tiles.Clay]: 0.1,
    [Tiles.Limestone]: 0.02,
    [Tiles.Sandstone]: 0.3,
    [Tiles.Brownrock]: 0.2,
    [Tiles.Pinkstone]: 0.02,
    [Tiles.Blackrock]: 0.02,
    [Tiles.Dirt]: 0.02,
    [Tiles.Emerald]: 0.01,
    [Tiles.Ruby]: 0.01,
    [Tiles.Sand]: 0.05,
    [Tiles.Magicblock]: 0.01,
    [Tiles.Sapphire]: 0.01,
    [Tiles.Gold]: 0.3
  },
  [Biomes.CrystalCaverns]: {
    [Tiles.Rock]: 0.05,
    [Tiles.Clay]: 0.03,
    [Tiles.Limestone]: 0.02,
    [Tiles.Sandstone]: 0.01,
    [Tiles.Brownrock]: 0.03,
    [Tiles.Pinkstone]: 0.02,
    [Tiles.Blackrock]: 0.2,
    [Tiles.Dirt]: 0.02,
    [Tiles.Emerald]: 0.25,
    [Tiles.Ruby]: 0.25,
    [Tiles.Sand]: 0.01,
    [Tiles.Magicblock]: 0.05,
    [Tiles.Sapphire]: 0.25,
    [Tiles.Gold]: 0.05
  }
};

export function getTileFromProbability<T extends string | number | symbol>(randomNumber: number, probabilityTable: { [key in T]: number }, defaultValue?:  T): T {
  let cumulativeProbability = 0;
  let lastTile: T | null = null;

  for (const [tile, probability] of Object.entries(probabilityTable)) {
    const tileEnum = parseInt(tile);
    cumulativeProbability += (probability as number) || 0;
    lastTile = tileEnum as T; // Track the last valid tile

    if (randomNumber <= cumulativeProbability) {
      return tileEnum as T;
    }
  }

  // Return the last tile if the probability table does not sum up to 1
  return lastTile !== null ? lastTile : defaultValue; // Default fallback to a common tile
}
