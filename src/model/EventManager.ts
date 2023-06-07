import Card from "./Card";
import Renderer from "./Renderer";
import Solitaire from "./Solitaire";

export default class EventManager {
  solitaire: Solitaire;
  renderer: Renderer;

  constructor(solitaire: Solitaire, renderer: Renderer) {
    this.#initListeners();
    this.solitaire = solitaire;
    this.renderer = renderer;
  }

  #initListeners() {
    window.addEventListener("click", this.handleSelectCard.bind(this));
    window.addEventListener("click", this.handleDeckToPick.bind(this));
  }

  convertElToCard(child: HTMLElement) {
    return this.solitaire.deck[child.dataset.cardType as OnlyUsableCard][
      Number(child.dataset.cardNumber) - 1
    ] as Card;
  }

  handleDeckToPick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    if (target) {
      const cosestDeck = target.closest("#deck");

      if (cosestDeck) {
        const deckCards = this.solitaire.getCardInDecks();
        if (deckCards.length > 0) {
          const pickCard = deckCards.splice(-1)[0];
          pickCard.updateState("pick");
          pickCard.open();
        }

        // console.log(deckCards[deckCards.length-1]);
        // console.log(deckCards.splice(-1));
        // console.log(deckCards[deckCards.length-1]);
      }
    }
    this.renderer.update();
  }

  handleSelectCard(e: MouseEvent) {
    const target = e.target as HTMLDivElement;

    document.querySelectorAll(".card").forEach((cardEl: any) => {
      const type = cardEl.dataset.cardType as OnlyUsableCard;
      const number = Number(cardEl.dataset.cardNumber) as number;
      const card = this.solitaire.deck[type][number - 1] as Card;
      if (card) {
        card.selected = false;
        cardEl.classList.remove("selected");
      }
    });

    if (target) {
      const emptyEl = target.closest(".empty");
      const selector = this.solitaire.selector;

      /* king on empty place logic */
      if (emptyEl && selector[0] !== null && selector[0][0].number === 13) {
        const column = target.parentElement as HTMLDivElement;
        const ground = column.parentElement as HTMLDivElement;
        const index = [...ground.children].findIndex(
          (child) => child === column
        );
        console.log("good");
        this.solitaire.moveToColumn(selector[0], index);
      } else if (
        emptyEl &&
        selector[0] !== null &&
        selector[0][0].number !== 13
      ) {
        console.log("bad");
      }

      if (target.closest(".card")) {
        const cardEl = target.closest(".card") as HTMLDivElement;
        const type = cardEl.dataset.cardType as OnlyUsableCard;
        const number = Number(cardEl.dataset.cardNumber) as number;
        const card = this.solitaire.deck[type][number - 1] as Card;

        if (cardEl.dataset.cardOpen === "true") {
          if (card.selected) {
            card.selected = false;
          } else {
            // card.selected = true;

            if (selector[0] === null) {
              const state = cardEl.dataset.cardState;
              const column = (cardEl as unknown as HTMLDivElement).parentNode;
              const lastItem = Array.from(column.children).slice(-1)[0];
              if (state === "pick" && lastItem === cardEl) {
                card.selected = true;
                selector[0] = [card];
              } else if (state === "ground") {
                const childrens = Array.from(column.children)
                  .filter((child) => child.classList.contains("card"))
                  .map(this.convertElToCard.bind(this)) as Card[];

                const index = childrens.findIndex(
                  (c) => c.type === card.type && c.number === card.number
                );

                if (index > -1) {
                  const slice = childrens.slice(index);
                  slice.forEach((item) => (item.selected = true));
                  selector[0] = slice;
                }
              }
            } else {
              if (selector[1] === null) {
                selector[1] = card;

                const isStackable = this.solitaire.compareWith(
                  selector[0][0],
                  selector[1]
                );
                if (isStackable) {
                  console.log("good");
                  this.solitaire.moveToColumn(selector[0], selector[1].column);
                } else {
                  console.log("bad");
                }

                this.solitaire.clearSelector();
                card.selected = false;
                cardEl.classList.remove("selected");
              }
            }
          }
        }
      } else {
        this.solitaire.clearSelector();
      }
    }
    this.renderer.update();
  }
}
