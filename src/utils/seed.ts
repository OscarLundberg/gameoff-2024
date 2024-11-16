import seedrandom from "seedrandom";

export class Seed {
  static current: Seed;
  protected random: seedrandom.PRNG


  private constructor(public seedData: string) {
    this.random = seedrandom(seedData);
  }

  public nextFloat(from: number, to: number | null = null) {
    if (to = null) { to = from; from = 0; }
    return this.random.quick() * (to! - from) + from;
  }
  public next(from: number, to: number | null = null) {
    if (to = null) { to = from; from = 0; }
    return Math.round(this.random.quick() * (to! - from) + from);
  }

  static init(seed = Math.floor(Math.random() * 1000000000).toString(16)) {
    Seed.current = new Seed(seed);
  }

  static extend(data: string) {
    return new Seed(Seed.current.seedData + data);
  }
}