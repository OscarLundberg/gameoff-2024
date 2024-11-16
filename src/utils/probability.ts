import { Seed } from "./seed.js";

export function probabilityTable<T>(items: [number, T][]) {
  const sum = items.reduce((prev, [cur, _]) => prev + cur, 0);
  const arr = items;
  return {
    getRandom(rng: Seed) {
      const r = rng.next(sum)
      let i = 0;
      while (i < sum) {
        const [num, item] = arr[i];
        if(r < (i + num)) {
          return item;
        }
      }
      const lastItem = arr.at(-1)!;
      return lastItem[1];
    }
  }
}