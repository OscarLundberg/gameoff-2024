import { SpriteRenderer } from "../components/spriterenderer";
import { Loadable } from "./loadable";

export abstract class Drawable extends Loadable<CanvasImageSource> {
  constructor() {
    super();
    SpriteRenderer.drawables = [...SpriteRenderer.drawables, this];
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}