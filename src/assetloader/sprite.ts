import { Drawable } from "./drawable";

export class Sprite extends Drawable {
  async load(): Promise<CanvasImageSource> {
    let asset = this.asset;

    if (typeof asset == "string") {
      const img = document.createElement("img");
      img.style.display = "none";
      img.src = asset;
      document.body.appendChild(img);
      return new Promise(res => {
        img.addEventListener("load", () => {
          res(img);
          img.remove();
        })
      });
    } else if (typeof asset == "function") {
      return await asset();
    } else {
      return asset;
    }
  }
  constructor(
    protected asset: string | CanvasImageSource | (() => Promise<CanvasImageSource> | CanvasImageSource),
    protected positionx = 0,
    protected positiony = 0,
    protected offsetx = 0,
    protected offsety = 0,
    protected w = 32,
    protected h = 32,
    protected targetw: number | null = null,
    protected targeth: number | null = null) {
    super();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.getPreloaded(), this.offsetx, this.offsety, this.w, this.h, this.positionx, this.positiony, this.targetw ?? this.w, this.targeth ?? this.h);
  }
}