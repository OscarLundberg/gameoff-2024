import { GameComponents } from "../game";

export abstract class Loadable<T = any> {
  unloaded!: T | Promise<T>
  cache?: T;


  lateStart(ctx: GameComponents) {
    this.unloaded = this.load();
    ctx.preload.queue(this)
  }

  async preload(): Promise<void> {
    const res = await this.unloaded;
    this.cache = res;
    this.unloaded = res;
  }
  getPreloaded() {
    return this.cache as T;
  }
  abstract load(): Promise<T> | T

}
