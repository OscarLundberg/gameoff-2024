import { Component } from "./component";
import { Drawable } from "../assetloader/drawable";
import { GameComponents } from "../game";

export class SpriteRenderer implements Component {
  static drawables: Drawable[] = [];
  lateStart(ctx: GameComponents): void | Promise<void> {
    for (let draw of SpriteRenderer.drawables) {
      draw?.lateStart?.(ctx);
    }
  }

  update(ctx: GameComponents): void | Promise<void> {
    for (let draw of SpriteRenderer.drawables) {
      draw?.draw?.(ctx.canvas.ctx2d)
    }
  }

}