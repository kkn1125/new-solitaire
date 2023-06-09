import EventManager from "./model/EventManager";
import Renderer from "./model/Renderer";
import Solitaire from "./model/Solitaire";

/* 
  MODE Value
  1: development
  0: production
*/
const MODE = 0;

const game = new Solitaire({
  mode: 0,
});
const renderer = new Renderer(game);
const eventManager = new EventManager(game, renderer);

renderer.render();
