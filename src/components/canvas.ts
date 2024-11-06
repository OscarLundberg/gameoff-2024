import { Component } from './component';

export class Canvas implements Component {
  public ctx2d: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canv";
    const _ctx = this.canvas.getContext("2d");
    if (!_ctx) { throw new Error("") }
    this.ctx2d = _ctx;
    this.setResolution(2);

    document.body.appendChild(this.canvas);

    //@ts-ignore
    _ctx.webkitImageSmoothingEnabled = false;
    //@ts-ignore
    _ctx.mozImageSmoothingEnabled = false;
    //@ts-ignore
    _ctx.imageSmoothingEnabled = false;
  }

  setResolution(scaleFactor: number, width = 1000, height = 750) {
    this.canvas.style.width = (width || this.canvas.width) + 'px';
    this.canvas.style.height = (height || this.canvas.height) + 'px';

    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.width = Math.ceil(this.canvas.width * scaleFactor);
    this.canvas.height = Math.ceil(this.canvas.height * scaleFactor);
    this.ctx2d.scale(scaleFactor, scaleFactor);
  }

  earlyUpdate(): void {
    this.ctx2d.clearRect(0, 0, this.ctx2d.canvas.width, this.ctx2d.canvas.height);
  }

}