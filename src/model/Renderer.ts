import { APP, CARD_ENV, DECK, GROUND, PICK, STACK } from "../util/global";
import Card from "./Card";
import Solitaire from "./Solitaire";

export default class Renderer {
  solitaire: Solitaire;

  constructor(solitaire: Solitaire) {
    this.solitaire = solitaire;
  }

  layout() {
    APP.innerHTML = `
      <div id="wrapper">

        <div id="top">

          <div id="pick-deck">
            <div id="deck">
              <div class="empty"></div>
              <div class="back"></div>
            </div>

            <div id="pick">
              <div class="empty"></div>
            </div>
          </div>

          <div id="stack">
          
            <div id="diamond-stack">
              <div class="empty"></div>
            </div>
            <div id="heart-stack">
              <div class="empty"></div>
            </div>
            <div id="spade-stack">
              <div class="empty"></div>
            </div>
            <div id="clover-stack">
              <div class="empty"></div>
            </div>
          
          </div>

        </div>
        <div id="body">
        
          <div id="ground">
          
            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

          
          </div>

        </div>

      </div>
    `;
  }

  ground() {
    const ground = this.solitaire.ground;
    return ground.forEach((column, col) => {
      GROUND().children[col].innerHTML = `<div class="empty"></div>`;

      GROUND().children[col].innerHTML += column
        .map((card, order) => this.groundCardForm(card, order))
        .join("");
    });
  }

  stack() {
    const stacks = this.solitaire.stack;
    const empty = `<div class="empty"></div>`;
    const el = (type: OnlyUsableCard) =>
      STACK().querySelector(`#${type}-stack`);

    Object.entries(stacks).forEach(([type, cards]) => {
      // console.log(type);
      // console.log(el(type as OnlyUsableCard));
      el(type as OnlyUsableCard).innerHTML = empty;
      cards.forEach((card, order) => {
        el(card.type as OnlyUsableCard).innerHTML += this.stackCardForm(
          card,
          order
        );
      });
    });
  }

  pick() {
    const picks = this.solitaire.pick.slice(-3);
    PICK().innerHTML = `<div class="empty"></div>`;
    return picks.forEach((pick, order) => {
      PICK().innerHTML += this.pickCardForm(pick, order);
    });
  }

  render() {
    this.layout();
    this.update();
  }

  update() {
    this.ground();
    this.pick();
    this.stack();
    this.isEmptyDeck();
  }

  isEmptyDeck() {
    if (this.solitaire.getCardInDecks().length === 0) {
      DECK().querySelector(".back").classList.add("zero");
    }
  }

  stackCardForm(card: Card, order: number) {
    return `
      <div
      class="card${card.selected ? " selected" : ""}"
      data-card-column="${card.column}"
      data-card-open="${card.isOpen}"
      data-card-number="${card.number}"
      data-card-type="${card.type}"
      data-card-state="${card.state}"
      style="top: 0px; left: 0px; background-image: url('${card.image}');">
      <!--
        <div class="card-top">
          <span>
            ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
          </span>
          <span>
            ${CARD_ENV.TAG[card.number]}
          </span>
        </div>
        <div class="card-mid">
          ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
        </div>
        <div class="card-bottom">
          <span>
            ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
          </span>
          <span>
            ${CARD_ENV.TAG[card.number]}
          </span>
        </div>
      -->
      </div>
    `;
  }

  groundCardForm(card: Card, order: number) {
    return `<div
    class="card${card.selected ? " selected" : ""}"
    data-card-column="${card.column}"
    data-card-open="${card.isOpen}"
    data-card-number="${card.number}"
    data-card-type="${card.type}"
    data-card-state="${card.state}"
    style="top: ${order * 22}px; background-image: url('${card.image}');">
    <!--
      <div class="card-top">
        <span>
          ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
        </span>
        <span>
          ${CARD_ENV.TAG[card.number]}
        </span>
      </div>
      <div class="card-mid">
        ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
      </div>
      <div class="card-bottom">
        <span>
          ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
        </span>
        <span>
          ${CARD_ENV.TAG[card.number]}
        </span>
      </div>
    -->
  </div>`;
  }

  pickCardForm(card: Card, order: number) {
    return `
    <div
    class="card${card.selected ? " selected" : ""}"
    data-card-column="${card.column}"
    data-card-open="${card.isOpen}"
    data-card-number="${card.number}"
    data-card-type="${card.type}"
    data-card-state="${card.state}"
    style="left: ${order * 22}px; background-image: url('${card.image}');">
    <!--
      <div class="card-top">
        <span>
          ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
        </span>
        <span>
          ${CARD_ENV.TAG[card.number]}
        </span>
      </div>
      <div class="card-mid">
        ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
      </div>
      <div class="card-bottom">
        <span>
          ${CARD_ENV.SHAPE[card.type as OnlyUsableCard]}
        </span>
        <span>
          ${CARD_ENV.TAG[card.number]}
        </span>
      </div>
    -->
    </div>
  `;
  }
}
