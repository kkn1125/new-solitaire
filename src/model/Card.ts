import { IMAGE } from "../util/global";

export default class Card {
  type: CardType = "back";
  number: number = 0;
  selected: boolean = false;
  state: CardState = "deck";
  color: CardColor = "none";
  image: string = "";

  isOpen: boolean = false;

  column: number = -1;

  constructor(type: CardType, number: number) {
    this.type = type;
    this.number = number;
    this.#initColor();
    this.#initImage();
    this.updateState("deck");
  }

  #initImage() {
    this.image = IMAGE(this.type, this.number);
  }
  #initColor() {
    switch (this.type) {
      case "back":
        this.color = "none";
        break;
      case "diamond":
        this.color = "red";
        break;
      case "heart":
        this.color = "red";
        break;
      case "spade":
        this.color = "black";
        break;
      case "clover":
        this.color = "black";
        break;
      default:
        this.color = "none";
        break;
    }
  }

  updateState(state: CardState) {
    this.state = state;
  }

  updateColumn(colNum: number) {
    this.column = colNum;
    return this;
  }

  open() {
    this.isOpen = true;
  }
}
