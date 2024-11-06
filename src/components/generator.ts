import { Component } from './component';
import { GameComponents } from '../game';
import { Spritesheet } from '../assetloader/spritesheet';
import tiles from "../assets/tileset2.png?url"
export class Generator implements Component {
  start(ctx: GameComponents): void | Promise<void> {
    const spritesheet = new Spritesheet(tiles, 0, 0, 4, 4, 298, 298);
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const w = 58.8;
        const rndx = Math.floor(Math.random() * 4);
        const rndy = Math.floor(Math.random() * 2);
        const tile = spritesheet.getInstance(2, 2, i * w, j * w, w, w);
      }
    }
  }




}