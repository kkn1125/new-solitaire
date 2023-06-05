import { APP, CARD_ENV, GROUND } from "../util/global";
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
          
            <div id="diamon-stack">
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
        .map(
          (card, order) =>
            `<div
            class="card${card.selected ? " selected" : ""}"
            data-card-column="${card.column}"
            data-card-open="${card.isOpen}"
            data-card-number="${card.number}"
            data-card-type="${card.type}"
            style="top: ${order * 22}px;">
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
          </div>`
        )
        .join("");
    });
  }

  render() {
    this.layout();
    this.update();
  }

  update() {
    this.ground();
  }
}
