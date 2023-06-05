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
      if (
        target.closest(".empty") &&
        this.solitaire.selector[0] !== null &&
        this.solitaire.selector[0][0].number === 13
      ) {
        const column = target.parentElement as HTMLDivElement;
        const ground = column.parentElement as HTMLDivElement;
        const index = [...ground.children].findIndex(
          (child) => child === column
        );
        console.log("good");
        this.solitaire.moveToColumn(this.solitaire.selector[0], index);
      } else if(target.closest(".empty") &&
      this.solitaire.selector[0] !== null &&
      this.solitaire.selector[0][0].number !== 13) {
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
            cardEl.classList.remove("selected");
          } else {
            card.selected = true;
            cardEl.classList.add("selected");

            if (this.solitaire.selector[0] === null) {
              const column = (cardEl as unknown as HTMLDivElement).parentNode;
              const childrens = Array.from((column as HTMLDivElement).children)
                .filter((child) => child.classList.contains("card"))
                .map(
                  (child: any) =>
                    this.solitaire.deck[
                      child.dataset.cardType as OnlyUsableCard
                    ][Number(child.dataset.cardNumber) - 1]
                );

              const index = childrens.findIndex(
                (c) => c.type === card.type && c.number === card.number
              );

              if (index > -1) {
                const slice = childrens.slice(index);
                this.solitaire.selector[0] = slice;
              }
            } else {
              if (this.solitaire.selector[1] === null) {
                this.solitaire.selector[1] = card;

                const isStackable = this.solitaire.compareWith(
                  this.solitaire.selector[0][0],
                  this.solitaire.selector[1]
                );
                if (isStackable) {
                  console.log("good");
                  this.solitaire.moveToColumn(
                    this.solitaire.selector[0],
                    this.solitaire.selector[1].column
                  );
                } else {
                  console.log("bad");
                }

                this.solitaire.selector[0] = null;
                this.solitaire.selector[1] = null;
                card.selected = false;
                cardEl.classList.remove("selected");
              }
            }
          }
        }
      } else {
        this.solitaire.selector[0] = null;
        this.solitaire.selector[1] = null;
      }
    }
    this.renderer.update();
  }
}
