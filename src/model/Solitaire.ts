import { CARD_ENV } from "../util/global";
import Card from "./Card";

export default class Solitaire {
  selector: [Card[] | null, Card | null] = [null, null];

  deck: CardDeck = {
    heart: [],
    diamond: [],
    spade: [],
    clover: [],
  };

  empty: Card = new Card("empty", 0);
  back: Card = new Card("back", 0);

  ground: Card[][] = [[], [], [], [], [], [], []];

  constructor() {
    this.#initDeck();
    this.#shuffleDeck();
    console.log(this.deck);
    console.log(this.ground);
  }

  #initDeck() {
    for (let type of CARD_ENV.TYPES) {
      for (let number = 1; number <= CARD_ENV.AMOUNT; number++) {
        const card = new Card(type, number);
        this.deck[type].push(card);
      }
    }
  }

  #shuffleDeck() {
    for (let i = 0; i < 28; i++) {
      const randomType = Math.floor(Math.random() * CARD_ENV.TYPES.length);
      const randomNumber = Math.floor(Math.random() * CARD_ENV.AMOUNT);
      const card = this.deck[CARD_ENV.TYPES[randomType]][randomNumber] as Card;
      if (card.state === "ground") {
        i--;
        continue;
      }
      this.addGroundColumn(card);
    }
  }

  findUsableColumn() {
    const index = this.ground.findIndex((column, i) => column.length < i + 1);
    const usableColumn = this.ground[index];
    return [index, usableColumn];
  }

  addGroundColumn(card: Card) {
    const [index, column] = this.findUsableColumn() as [number, Card[]];
    card.updateState("ground");
    card.updateColumn(index);
    column.push(card);
    if (column.length === index + 1) {
      card.open();
    }
  }

  asList() {
    return Object.values(this.deck).flat(1) as Card[];
  }

  getCardInDecks() {
    return this.asList().filter((card) => card.state === "deck");
  }

  getCardInGrounds() {
    return this.asList().filter((card) => card.state === "ground");
  }

  getCardInStacks() {
    return this.asList().filter((card) => card.state === "stack");
  }

  getCardInPicks() {
    return this.asList().filter((card) => card.state === "pick");
  }

  compareWith(first: Card, second: Card) {
    return (
      this.isStackableColorType(first, second) &&
      this.isStackableNumber(first, second)
    );
  }

  isStackableColorType(first: Card, second: Card) {
    return first.color !== second.color;
  }

  isStackableNumber(first: Card, second: Card) {
    return first.number + 1 === second.number;
  }

  moveToColumn(cards: Card[], column: number) {
    const startCard = cards[0];
    const startColumn = startCard.column;
    if (startCard.state === "ground") {
      const startIndex = this.findOrderInColumn(startCard);
      const slice = this.ground[startColumn].splice(startIndex);
      this.ground[column].push(
        ...slice.map((card) => card.updateColumn(column))
      );
      if (this.ground[startColumn].slice(-1)[0]) {
        this.ground[startColumn].slice(-1)[0].isOpen = true;
      }
      console.log(this.ground[startColumn]);
    } else if (startCard.state === "pick") {
      startCard.updateColumn(column);
      startCard.updateState("ground");
      this.ground[column].push(startCard);
    }
  }

  findOrderInColumn(card: Card) {
    return this.ground[card.column].findIndex(
      (c) => c.type === card.type && c.number === card.number
    );
  }

  clearSelector() {
    this.selector[0] = null;
    this.selector[1] = null;
  }
}
