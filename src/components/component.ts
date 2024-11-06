import { GameComponents } from "../game";

export interface Component<IContext extends GameComponents = GameComponents> {
  earlyUpdate?(ctx: IContext): void;
  update?(ctx: IContext): void;
  lateUpdate?(ctx: IContext): void;
  start?(ctx: IContext): void | Promise<void>;
  lateStart?(ctx: IContext): void | Promise<void>;
}
