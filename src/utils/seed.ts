import seedrandom from "seedrandom";

export class Seed {
  protected random: seedrandom.PRNG


  private constructor(public seedData: string) {
    this.random = seedrandom(seedData);
  }

  public nextFloat(from: number, to: number | null = null) {
    if (to == null) { to = from; from = 0; }
    return this.random.quick() * (to! - from) + from;
  }
  public next(from: number, to: number | null = null) {
    if (to == null) { to = from; from = 0; }
    return Math.round(this.random.quick() * (to! - from) + from);
  }

  static init(seed = Math.floor(Math.random() * 1000000000).toString(16)) {
    return new Seed(seed);
  }

  extend(data: string) {
    return new Seed(this.seedData + data);
  }

  pick<T>(arr: T[]) {
    const n = this.next(0, arr.length);
    return arr[n];
  }
}