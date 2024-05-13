import EventManager from "./model/EventManager";
import Renderer from "./model/Renderer";
import Solitaire from "./model/Solitaire";
import { APP, version } from "./util/global";

/* 
  MODE Value
  1: development
  0: production
*/
const MODE = 0;

const game = new Solitaire({
  mode: MODE,
});
const renderer = new Renderer(game);
const eventManager = new EventManager(game, renderer);

renderer.render();

const versionTag = document.createElement("div");

versionTag.innerText = version;
versionTag.classList.add("app-version");

APP.append(versionTag);
