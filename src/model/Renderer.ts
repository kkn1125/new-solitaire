import {
  APP,
  AUTO_COMPLETE,
  CARD_ENV,
  DECK,
  GROUND,
  PICK,
  STACK,
  TIMER,
} from "../util/global";
import { format, formatFromCountdown } from "../util/tool";
import Card from "./Card";
import Solitaire from "./Solitaire";

const isDesktop = () => innerWidth > 768;
const useImage = () => false || isDesktop();

const cardImages = (card: Card) =>
  useImage() ? `background-image: url('${card.image}');` : "";
const cardTexts = (card: Card) => `${useImage() ? "<!--" : ""}
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
  ${useImage() ? "-->" : ""}`;

export default class Renderer {
  solitaire: Solitaire;
  timer: number;
  auto_complete: boolean = false;
  active_auto_complete: boolean = false;

  constructor(solitaire: Solitaire) {
    this.solitaire = solitaire;
  }

  renderTimer() {
    clearInterval(this.timer);
    let startTime = 0; // 1 second per unit = 0.1

    TIMER().innerHTML = `00:00`;
    this.startTimer(startTime);
  }

  startTimer(startTime: number) {
    this.timer = setInterval(() => {
      const form = formatFromCountdown((startTime += 0.001));
      let count = 9;
      let loop = setInterval(() => {
        if (count === 0) {
          clearTimeout(loop);
        }
        TIMER().innerHTML = `${form}${count}`;
        count--;
      }, 1);
      TIMER().innerHTML = `${form}0`;
    }, 10);
  }

  layout() {
    APP.innerHTML = `
      <!-- <div id="timer"></div> -->
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
      <button id="restart">Solitaire!</button>
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
    // this.renderTimer();
    this.update();
  }

  update() {
    this.ground();
    this.pick();
    this.stack();
    this.isEmptyDeck();
    // this.checkAutoStack();
    if (this.auto_complete && !AUTO_COMPLETE()) {
      APP.innerHTML += `<button id="auto-complete">AUTO COMPLETE!!</button>`;
    }
  }

  checkAutoStack() {
    const isEmptyStore = this.solitaire.store.length === 0;
    const isEmptyPick = this.solitaire.pick.length === 0;
    if (isEmptyPick && isEmptyStore) {
      // console.log("empty store");
      // console.log("empty pick");
      const copyGround = this.solitaire.ground.slice(0);
      const copyStack = Object.assign({}, this.solitaire.stack);
      let isStop = false;

      while (copyGround.every((column) => column.length !== 0)) {
        const diamond = copyStack.diamond.slice(-1)[0];
        const heart = copyStack.heart.slice(-1)[0];
        const spade = copyStack.spade.slice(-1)[0];
        const clover = copyStack.clover.slice(-1)[0];

        for (let column of copyGround) {
          const lastCardOfColumn = column.slice(-1)[0];
          if (!lastCardOfColumn) continue;
          const isSameForDiamond =
            lastCardOfColumn.number === diamond.number + 1 &&
            lastCardOfColumn.type === diamond.type;
          const isSameForHeart =
            lastCardOfColumn.number === heart.number + 1 &&
            lastCardOfColumn.type === heart.type;
          const isSameForSpade =
            lastCardOfColumn.number === spade.number + 1 &&
            lastCardOfColumn.type === spade.type;
          const isSameForClover =
            lastCardOfColumn.number === clover.number + 1 &&
            lastCardOfColumn.type === clover.type;
          if (isSameForDiamond) {
            copyStack["diamond"].push(copyStack.diamond.splice(-1)[0]);
            break;
          } else if (isSameForHeart) {
            copyStack["heart"].push(copyStack.heart.splice(-1)[0]);
            break;
          } else if (isSameForSpade) {
            copyStack["spade"].push(copyStack.spade.splice(-1)[0]);
            break;
          } else if (isSameForClover) {
            copyStack["clover"].push(copyStack.clover.splice(-1)[0]);
            break;
          } else {
            isStop = true;
            break;
          }
        }

        if (isStop) {
          break;
        }
      }
      if (!isStop && !this.auto_complete && !this.active_auto_complete) {
        this.auto_complete = true;
      }

      if (this.auto_complete && this.solitaire.getCardInGrounds().length > 0) {
        this.auto_complete = true;
        this.active_auto_complete = false;
      }
      console.log(isStop ? "no auto complete" : "auto complete");
    }
  }

  isEmptyDeck() {
    if (this.solitaire.store.length === 0) {
      DECK().querySelector(".back").classList.add("zero");
    } else {
      DECK().querySelector(".back").classList.remove("zero");
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
      style="top: 0px; left: 0px; ${cardImages(card)}">
      ${cardTexts(card)}
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
    style="top: ${isDesktop() ? order * 22 : order * 15}px; ${cardImages(
      card
    )}">
    ${cardTexts(card)}
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
    style="left: ${order * 22}px; ${cardImages(card)}">
    ${cardTexts(card)}
    </div>
  `;
  }

  soundPick() {
    var audio = new Audio("/sounds/pick_sound.mp4");
    audio.currentTime = 0.05;
    audio.volume = 0.7;
    audio.play();
  }
  soundShuffle() {
    var audio = new Audio("/sounds/shuffle_sound.mp4");
    audio.currentTime = 0.01;
    audio.volume = 0.5;
    audio.play();
  }
}
