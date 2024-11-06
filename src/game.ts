import { Canvas } from "./components/canvas";
import { Component } from "./components/component";
import { SpriteRenderer } from "./components/spriterenderer";
import { Generator } from "./components/generator";
import { Preloader } from "./components/preloader";

export type GameComponents = Game["components"];

export class Game {
  components = {
    canvas: new Canvas(),
    preload: new Preloader(),
    spriteRenderer: new SpriteRenderer(),
    generator: new Generator()
  };

  constructor() {
    this.beginUpdate();
  }

  private async beginUpdate() {
    await this.start(this.components)
    await this.lateStart(this.components)

    await this.components.preload.afterStart(this.components);

    this.nextFrame();
  }

  private nextFrame() {
    requestAnimationFrame(() => {
      this.earlyUpdate(this.components);
      this.update(this.components);
      this.lateUpdate(this.components);
      this.nextFrame();
    });
  }


  private earlyUpdate(ctx: GameComponents) {
    for (let component of Object.values(this.components)) {
      (component as Component)?.earlyUpdate?.(ctx);
    }
  }
  private update(ctx: GameComponents) {
    for (let component of Object.values(this.components)) {
      (component as Component)?.update?.(ctx);
    }
  }
  private lateUpdate(ctx: GameComponents) {
    for (let component of Object.values(this.components)) {
      (component as Component)?.lateUpdate?.(ctx);
    }
  }

  private async start(ctx: GameComponents) {
    let promises: (Promise<void> | void)[] = [];
    for (let component of Object.values(this.components)) {
      promises = [...promises, (component as Component)?.start?.(ctx)];
    }
    await Promise.all(promises);
  }

  private async lateStart(ctx: GameComponents) {
    let promises: (Promise<void> | void)[] = [];
    for (let component of Object.values(this.components)) {
      promises = [...promises, (component as Component)?.lateStart?.(ctx)];
    }
    await Promise.all(promises);
  }
}