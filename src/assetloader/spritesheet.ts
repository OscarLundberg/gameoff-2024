import { Sprite } from "./sprite";

export class Spritesheet extends Sprite {
  getInstance(atx = 0, aty = 0, posx = 0, posy = 0, w = 0, h = 0) {
    const x = this.offsetx + (atx * this.w);
    const y = this.offsety + (aty * this.h);
    const ref = this;
    return new Sprite(() => ref.unloaded, posx, posy, x, y, this.w, this.h, w, h);
  }
  override draw(ctx: CanvasRenderingContext2D): void { }
}