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
    window.addEventListener("click", this.handleAutoComplete.bind(this));
    window.addEventListener("click", this.handleSelectCard.bind(this));
    window.addEventListener("click", this.handleDeckToPick.bind(this));
    window.addEventListener("click", this.handleRestartGame.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  removeAllListeners() {
    window.removeEventListener("click", this.handleSelectCard.bind(this));
    window.removeEventListener("click", this.handleDeckToPick.bind(this));
    window.removeEventListener("click", this.handleRestartGame.bind(this));
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleAutoComplete(e: MouseEvent) {
    const self = this;
    const target = e.target as HTMLButtonElement;

    if (target.id !== "auto-complete") return;

    this.renderer.active_auto_complete = true;
    this.renderer.auto_complete = false;
    target.remove();

    function autoComplete() {
      const filtered = self.solitaire.ground.filter((column) => column.length);
      for (let i = 0; i < filtered.length; i++) {
        const column = filtered[i];
        const columnLast = column.slice(-1)[0];
        if (columnLast) {
          const stack = self.solitaire.stack[columnLast.type as OnlyUsableCard];
          if (stack.length === 0 && column.slice(-1)[0].number === 1) {
            const card = column.splice(-1)[0];
            card.updateColumn(-1);
            card.updateState("stack");
            stack.push(card);
            self.renderer.update();
          } else if (
            stack.slice(-1)[0] &&
            stack.slice(-1)[0].number + 1 === columnLast.number
          ) {
            const card = column.splice(-1)[0];
            card.updateColumn(-1);
            card.updateState("stack");
            stack.push(card);
            self.renderer.update();
          } else {
            continue;
          }
        } else {
          continue;
        }
      }

      if (filtered.some((column) => column.length > 0)) {
        setTimeout(() => {
          autoComplete();
        }, 100);
      } else {
        self.renderer.active_auto_complete = false;
        self.renderer.auto_complete = false;
      }
    }

    autoComplete();
  }

  handleResize() {
    if (innerWidth > 768) {
      this.renderer.update();
    } else {
      this.renderer.update();
    }
  }

  handleRestartGame(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    if (target.id === "restart") {
      this.renderer.regame();
    }
  }

  convertElToCard(child: HTMLElement) {
    return this.solitaire.deck[child.dataset.cardType as OnlyUsableCard].find(
      (card) => card.number === Number(child.dataset.cardNumber)
    ) as Card;
  }

  handleDeckToPick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    if (target) {
      const closestDeck = target.closest("#deck");

      if (closestDeck) {
        const deckCards = this.solitaire.store;
        if (deckCards.length > 0) {
          const pickCard = deckCards.shift();
          pickCard.updateState("pick");
          pickCard.open();
          this.solitaire.pick.push(pickCard);
          this.renderer.soundPick();
        } else {
          this.solitaire.store.push(
            ...this.solitaire.pick.splice(0).map((card) => {
              card.isOpen = false;
              card.updateColumn(-1);
              card.updateState("deck");
              return card;
            })
          );
          this.renderer.soundShuffle();
        }

        this.renderer.update();
      }
    }
  }

  handleSelectCard(e: MouseEvent) {
    const target = e.target as HTMLDivElement;

    document.querySelectorAll(".card").forEach((cardEl: any) => {
      const type = cardEl.dataset.cardType as OnlyUsableCard;
      const number = Number(cardEl.dataset.cardNumber) as number;
      const card = this.solitaire.deck[type].find(
        (card) => card.number === number
      ) as Card;
      if (card) {
        card.selected = false;
        cardEl.classList.remove("selected");
      }
    });

    if (target) {
      const emptyEl = target.closest(".empty");
      const selector = this.solitaire.selector;
      const testModeWithoutKing = this.solitaire.mode === "development";

      /* king on empty place logic */
      if (
        emptyEl &&
        selector[0] !== null &&
        (testModeWithoutKing || selector[0][0].number === 13)
      ) {
        const column = target.parentElement as HTMLDivElement;
        const ground = column.parentElement as HTMLDivElement;
        const index = [...ground.children].findIndex(
          (child) => child === column
        );
        console.log("good");
        this.solitaire.countUpMove();
        this.solitaire.moveToColumn(selector[0], index);
        this.renderer.update();
        this.renderer.soundPick();
      } else if (
        emptyEl &&
        selector[0] !== null &&
        (testModeWithoutKing || selector[0][0].number !== 13)
      ) {
        console.log("bad");
      }
      if (target.closest(".card")) {
        const cardEl = target.closest(".card") as HTMLDivElement;
        const type = cardEl.dataset.cardType as OnlyUsableCard;
        const number = Number(cardEl.dataset.cardNumber) as number;
        const card = this.solitaire.deck[type].find(
          (card) => card.number === number
        ) as Card;
        if (cardEl.dataset.cardOpen === "true") {
          if (card.selected) {
            card.selected = false;
          } else {
            if (selector[0] === null) {
              const state = cardEl.dataset.cardState;
              const column = (cardEl as unknown as HTMLDivElement).parentNode;
              const lastItem = Array.from(column.children).slice(-1)[0];
              if (
                (state === "ground" || state === "pick" || state === "stack") &&
                lastItem === cardEl
              ) {
                if (this.solitaire.isStackDirectly(card)) {
                  this.solitaire.clearSelector();
                  card.selected = false;
                  cardEl.classList.remove("selected");
                  this.solitaire.countUpScore();

                  this.renderer.update();
                  this.renderer.soundPick();

                  if (this.solitaire.getCardInStacks().length > 0) {
                    if (
                      this.solitaire.compareDeck[0] <
                      this.solitaire.getCardInStacks().length
                    ) {
                      this.solitaire.compareDeck[0] =
                        this.solitaire.getCardInStacks().length;
                      this.solitaire.compareDeck[1] =
                        this.solitaire.compareDeck[0];
                    } else {
                      this.solitaire.compareDeck[1] =
                        this.solitaire.getCardInStacks().length;
                    }
                  }
                  return;
                }

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
              if (selector[1] === null && card.state === "ground") {
                selector[1] = card;

                const isStackable = this.solitaire.compareWith(
                  selector[0][0],
                  selector[1]
                );
                if (
                  Array.from(cardEl.parentElement.children).slice(-1)[0] ===
                  cardEl
                ) {
                  if (isStackable) {
                    console.log("good");
                    this.solitaire.countUpMove();
                    this.solitaire.moveToColumn(
                      selector[0],
                      selector[1].column
                    );
                    this.renderer.soundPick();
                  } else {
                    console.log("bad");
                  }
                }

                this.solitaire.clearSelector();
                card.selected = false;
                cardEl.classList.remove("selected");
              } else {
                this.solitaire.clearSelector();
                card.selected = false;
                cardEl.classList.remove("selected");
              }
            }
          }
        }
        this.renderer.update();
      } else {
        this.solitaire.clearSelector();
      }
    }
  }
}
