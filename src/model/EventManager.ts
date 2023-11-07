import Card from "./Card";
import Logger from "./Logger";
import Renderer from "./Renderer";
import Solitaire from "./Solitaire";

export default class EventManager {
  solitaire: Solitaire;
  renderer: Renderer;
  logger: Logger;

  constructor(solitaire: Solitaire, renderer: Renderer) {
    this.#initListeners();
    this.solitaire = solitaire;
    this.renderer = renderer;
    this.logger = new Logger(this.constructor.name);
  }

  #initListeners() {
    window.addEventListener("click", this.handleAutoComplete.bind(this));
    window.addEventListener("click", this.handleSelectCard.bind(this));
    window.addEventListener("click", this.handleDeckToPick.bind(this));
    window.addEventListener("click", this.handleRestartGame.bind(this));
    window.addEventListener("click", this.handleRandomTheme.bind(this));
    window.addEventListener("click", this.handleToggleEffect.bind(this));
    window.addEventListener("click", this.handleToggleBGm.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));

    // document.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    document.addEventListener("visibilitychange", this.handleTabout.bind(this));
    window.addEventListener("beforeunload", this.handleBeforeClose.bind(this));
  }

  // handleMouseLeave(e: MouseEvent) {}

  handleTabout(e: Event) {
    if (document.hidden) {
      this.solitaire.bgmOff();
    } else {
      if (this.solitaire.sound.bgm.active) {
        this.solitaire.bgmStart();
      }
    }
  }

  handleBeforeClose(e: BeforeUnloadEvent) {
    this.removeAllListeners();
  }

  handleToggleEffect(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const closest = target.closest("#effect");

    if (closest && closest.id === "effect") {
      this.solitaire.effect = !this.solitaire.effect;
      this.renderer.update();
    }
  }

  handleToggleBGm(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const closest = target.closest("#bgm");

    if (closest && closest.id === "bgm") {
      this.solitaire.sound.bgm.active = !this.solitaire.sound.bgm.active;
      this.renderer.update();
    }
  }

  handleRandomTheme(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const closest = target.closest("#theme");

    if (closest && closest.id === "theme") {
      // this.solitaire.randomTheme();
      this.solitaire.nextTheme();
      this.renderer.update();
    }
  }

  removeAllListeners() {
    window.removeEventListener("click", this.handleAutoComplete.bind(this));
    window.removeEventListener("click", this.handleSelectCard.bind(this));
    window.removeEventListener("click", this.handleDeckToPick.bind(this));
    window.removeEventListener("click", this.handleRestartGame.bind(this));
    window.removeEventListener("click", this.handleRandomTheme.bind(this));
    window.removeEventListener("click", this.handleToggleEffect.bind(this));
    window.removeEventListener("click", this.handleToggleBGm.bind(this));
    window.removeEventListener("resize", this.handleResize.bind(this));

    // document.removeEventListener(
    //   "mouseleave",
    //   this.handleMouseLeave.bind(this)
    // );
    document.removeEventListener(
      "visibilitychange",
      this.handleTabout.bind(this)
    );
    window.removeEventListener(
      "beforeunload",
      this.handleBeforeClose.bind(this)
    );
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
      const isGroundEl = target.parentElement.parentElement.id === "ground";
      const selector = this.solitaire.selector;
      const testModeWithoutKing = this.solitaire.mode === "development";
      /* king on empty place logic */
      if (
        isGroundEl &&
        emptyEl &&
        selector[0] !== null &&
        (testModeWithoutKing || selector[0][0].number === 13)
      ) {
        const column = target.parentElement as HTMLDivElement;
        const ground = column.parentElement as HTMLDivElement;
        const index = [...ground.children].findIndex(
          (child) => child === column
        );
        console.log(this.logger.log);
        this.logger.log("good");
        this.solitaire.countUpMove();
        this.solitaire.moveToColumn(selector[0], index);
        this.renderer.update();
        this.renderer.soundPick();
      } else if (
        emptyEl &&
        selector[0] !== null &&
        (testModeWithoutKing || selector[0][0].number !== 13)
      ) {
        this.logger.log("bad");
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
                    this.logger.log("good");
                    this.solitaire.countUpMove();
                    this.solitaire.moveToColumn(
                      selector[0],
                      selector[1].column
                    );
                    this.renderer.soundPick();
                  } else {
                    this.logger.log("bad");
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
