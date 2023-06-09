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

  constructor() {
    this.#initDeck();
    // this.#shuffleDeck();
    this.#deckToGround();
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
    // const temp: {
    //   heart: Card[];
    //   diamond: Card[];
    //   spade: Card[];
    //   clover: Card[];
    // } = {
    //   heart: [],
    //   diamond: [],
    //   spade: [],
    //   clover: [],
    // };

    console.log("[SYS] Shuffle start All decks");

    this.deck.heart = this.deck.heart
      .sort(
        (a, b) =>
          Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20)
      )
      .map((card) => {
        const copyCard = new Card(card.type, card.number);
        copyCard.column = -1;
        copyCard.image = card.image;
        copyCard.isOpen = card.isOpen;
        copyCard.state = card.state;
        copyCard.color = card.color;
        return copyCard;
      });
    this.deck.diamond = this.deck.diamond
      .sort(
        (a, b) =>
          Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20)
      )
      .map((card) => {
        const copyCard = new Card(card.type, card.number);
        copyCard.column = -1;
        copyCard.image = card.image;
        copyCard.isOpen = card.isOpen;
        copyCard.state = card.state;
        copyCard.color = card.color;
        return copyCard;
      });
    this.deck.spade = this.deck.spade
      .sort(
        (a, b) =>
          Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20)
      )
      .map((card) => {
        const copyCard = new Card(card.type, card.number);
        copyCard.column = -1;
        copyCard.image = card.image;
        copyCard.isOpen = card.isOpen;
        copyCard.state = card.state;
        copyCard.color = card.color;
        return copyCard;
      });
    this.deck.clover = this.deck.clover
      .sort(
        (a, b) =>
          Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20)
      )
      .map((card) => {
        const copyCard = new Card(card.type, card.number);
        copyCard.column = -1;
        copyCard.image = card.image;
        copyCard.isOpen = card.isOpen;
        copyCard.state = card.state;
        copyCard.color = card.color;
        return copyCard;
      });

    console.log("[SYS] Shuffle done All decks");

    // Object.assign(this.deck, Object.assign({}, temp));

    // for (let card of this.deck.diamond) {
    // }
    // for (let card of this.deck.spade) {
    // }
    // for (let card of this.deck.clover) {
    // }
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
    console.log(card.state);
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
          console.log(card, found);
          this.moveToStack(card);
          // this.moveToGround(card, found.column);
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
          console.log(pickCard);
          console.log(typeOfStack);
          console.log(typeOfStackLastCard);
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
        // startCard.updateColumn(column);
        // startCard.updateState("ground");
      }
    } else if (startCard.state === "ground") {
      const startIndex = this.findOrderInColumn(startCard);
      const slice = this.ground[startColumn].splice(startIndex);
      this.ground[column].push(
        ...slice.map((card) => card.updateColumn(column))
      );
      this.afterCardOpen(startColumn);
      this.moveToGround(startCard, column);
      // startCard.updateColumn(column);
      // startCard.updateState("ground");
    } else if (startCard.state === "pick") {
      const startIndex = this.findOrderInPickList(startCard);
      const slice = this.pick.splice(startIndex);
      this.ground[column].push(
        ...slice.map((card) => card.updateColumn(column))
      );
      this.moveToGround(startCard, column);
      // startCard.updateColumn(column);
      // startCard.updateState("ground");
      // this.ground[column].push(startCard);
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
