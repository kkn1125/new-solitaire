import { CARD_ENV } from "../util/global";
import Card from "./Card";

const themes = [
  "theme-1",
  "theme-2",
  "theme-3",
  "theme-4",
  "theme-5",
  "theme-6",
  "theme-7",
];

type GameMode = "development" | "production";

interface Options {
  mode: GameMode | number;
}

export default class Solitaire {
  empty: Card = new Card("empty", 0);
  back: Card = new Card("back", 0);
  mode: GameMode = "development";
  selector: [Card[] | null, Card | null] = [null, null];

  deck: CardDeck = {
    heart: [],
    diamond: [],
    spade: [],
    clover: [],
  };

  store: Card[] = [];
  pick: Card[] = [];
  stack: {
    [k in OnlyUsableCard]: Card[];
  } = {
    heart: [],
    diamond: [],
    spade: [],
    clover: [],
  };
  ground: Card[][] = [[], [], [], [], [], [], []];

  score: number = 0;
  move: number = 0;

  compareDeck: [number, number] = [0, 0];

  themeIndex: number = 0;
  currentTheme: string = themes[0];

  constructor(options: Options) {
    if (typeof options.mode === "number") {
      this.mode = options.mode ? "development" : "production";
    } else {
      this.mode = options.mode || "development";
    }
    this.#initDeck();
    if (this.mode === "development") {
      this.#deckToGroundTest();
    } else {
      this.#deckToGround();
    }
    this.#deckToStore();
    // console.log(this.store);
  }

  randomTheme() {
    this.currentTheme = themes[Math.floor(themes.length * Math.random())];
  }

  nextTheme() {
    this.themeIndex += 1;
    this.currentTheme = themes[this.themeIndex % themes.length];
  }

  countUpScore() {
    this.score += 1;
  }
  countUpMove() {
    this.move += 1;
  }

  regame() {
    this.selector = [null, null];
    this.deck = {
      heart: [],
      diamond: [],
      spade: [],
      clover: [],
    };
    this.empty = new Card("empty", 0);
    this.back = new Card("back", 0);
    this.store = [];
    this.pick = [];
    this.stack = {
      heart: [],
      diamond: [],
      spade: [],
      clover: [],
    };
    this.ground = [[], [], [], [], [], [], []];
    this.score = 0;
    this.move = 0;
    this.#initDeck();
    if (this.mode === "development") {
      this.#deckToGroundTest();
    } else {
      this.#deckToGround();
    }
    this.#deckToStore();
  }

  #initDeck() {
    for (let type of CARD_ENV.TYPES) {
      for (let number = 1; number <= CARD_ENV.AMOUNT; number++) {
        const card = new Card(type, number);
        this.deck[type].push(card);
      }
    }
  }

  #deckToGroundTest() {
    const slice = ["heart", "spade", "diamond", "clover"];

    for (let i = 12; i >= 0; i--) {
      for (let type of slice) {
        const card = this.deck[type as OnlyUsableCard][i] as Card;
        const index = slice.findIndex((t) => t === type);
        card.updateState("ground");
        card.updateColumn(index);
        card.open();
        this.ground[index].push(card);
      }
      slice.push(slice.shift());
    }
  }

  #deckToGround() {
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

  #deckToStore() {
    const deckList = this.getCardInDecks();
    for (;;) {
      if (deckList.length === 0) break;
      const card = deckList.splice(
        Math.floor(Math.random() * deckList.length),
        1
      )[0];
      this.store.push(card);
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

  isStackDirectly(card: Card) {
    const typeOfStack = this.stack[card.type as OnlyUsableCard];
    const typeOfStackLastCard = typeOfStack.slice(-1)[0];
    const currentColumn = card.column;
    if (card.state === "pick") {
      const picks = this.pick;
      const lastCardIndex = picks.findIndex(
        (pick) => pick.number === card.number && pick.type === card.type
      );
      if (lastCardIndex > -1) {
        if (
          (typeOfStack.length === 0 && card.number === 1) ||
          (typeOfStackLastCard &&
            typeOfStackLastCard.number + 1 === card.number)
        ) {
          const found = picks.splice(lastCardIndex)[0];
          this.moveToStack(card);
          return true;
        }
      }
    } else if (this.ground[currentColumn] && card.state !== "stack") {
      const cardIndex = this.ground[currentColumn].findIndex(
        (item) => item.number === card.number && item.type === card.type
      );
      if (cardIndex > -1) {
        if (
          (typeOfStack.length === 0 && card.number === 1) ||
          (typeOfStackLastCard &&
            typeOfStackLastCard.number + 1 === card.number)
        ) {
          const pickCard = this.ground[currentColumn].splice(cardIndex)[0];
          this.afterCardOpen(currentColumn);
          this.moveToStack(pickCard);
          return true;
        }
      }
    }
    return false;
  }

  moveToGround(card: Card, column: number) {
    card.updateColumn(column);
    card.updateState("ground");
  }

  moveToStack(card: Card) {
    card.updateColumn(-1);
    card.updateState("stack");
    this.stack[card.type as OnlyUsableCard].push(card);
  }

  moveToColumn(cards: Card[], column: number) {
    const startCard = cards[0];
    const startColumn = startCard.column;
    if (startCard.state === "stack") {
      const cardIndex = this.stack[startCard.type as OnlyUsableCard].findIndex(
        (stack) =>
          stack.number === startCard.number && stack.type === startCard.type
      );
      if (cardIndex > -1) {
        const slice =
          this.stack[startCard.type as OnlyUsableCard].splice(cardIndex);
        this.ground[column].push(...slice);
        this.afterCardOpen(column);
        this.moveToGround(startCard, column);
      }
    } else if (startCard.state === "ground") {
      const startIndex = this.findOrderInColumn(startCard);
      const slice = this.ground[startColumn].splice(startIndex);
      this.ground[column].push(
        ...slice.map((card) => card.updateColumn(column))
      );
      this.afterCardOpen(startColumn);
      this.moveToGround(startCard, column);
    } else if (startCard.state === "pick") {
      const startIndex = this.findOrderInPickList(startCard);
      const slice = this.pick.splice(startIndex);
      this.ground[column].push(
        ...slice.map((card) => card.updateColumn(column))
      );
      this.moveToGround(startCard, column);
    }
  }

  afterCardOpen(column: number) {
    if (this.ground[column].slice(-1)[0]) {
      this.ground[column].slice(-1)[0].isOpen = true;
    }
  }

  findOrderInColumn(card: Card) {
    return this.ground[card.column].findIndex(
      (c) => c.type === card.type && c.number === card.number
    );
  }

  findOrderInPickList(card: Card) {
    return this.pick.findIndex(
      (c) => c.type === card.type && c.number === card.number
    );
  }

  clearSelector() {
    this.selector[0] = null;
    this.selector[1] = null;
  }
}
