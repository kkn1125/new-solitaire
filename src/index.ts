import EventManager from "./model/EventManager";
import Renderer from "./model/Renderer";
import Solitaire from "./model/Solitaire";

/* 
  MODE Value
  1: development
  0: production
*/
const MODE = 1;

const game = new Solitaire(MODE);
const renderer = new Renderer(game);
const eventManager = new EventManager(game, renderer);

renderer.render();
