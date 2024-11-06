import { Component } from './component';
import { GameComponents } from '../game';
import { Loadable } from '../assetloader/loadable';

export class Preloader implements Component {
  _queue: Promise<void>[] = []
  start(ctx: GameComponents) { }
  async afterStart(ctx: GameComponents) {
    if (this._queue?.length > 0) {
      await Promise.all(this._queue);
      this._queue = [];
    }
  }

  queue(...loadables: Loadable[]) {
    this._queue = [...this._queue, ...loadables.map(e => e.preload())];
  }


}