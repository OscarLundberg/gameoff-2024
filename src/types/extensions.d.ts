import { GameObject } from "../engine/gameobject"
import { Component } from '../components/component';

declare global {
  interface Array<T extends Component> {
    toGameObject(): GameObject<{ [key in T]: T }>;
  }
}








