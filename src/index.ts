
import EventManager from "./model/EventManager";
import Renderer from "./model/Renderer";
import Solitaire from "./model/Solitaire";

const game = new Solitaire();
const renderer = new Renderer(game);
const eventManager = new EventManager(game, renderer);

renderer.render();
