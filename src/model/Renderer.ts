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
    // console.log(stacks);
    if (Object.entries(stacks).some((typeStack) => typeStack[1].length > 0)) {
      Object.entries(stacks).forEach(([type, cards]) => {
        // console.log(type, cards);
        el(type as OnlyUsableCard).innerHTML = empty;
        cards.forEach((card, order) => {
          el(card.type as OnlyUsableCard).innerHTML += this.stackCardForm(
            card,
            order
          );
        });
      });
    }
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
    this.checkAutoStack();
    // console.log(this.auto_complete);
    if (!this.active_auto_complete) {
      if (this.auto_complete && !AUTO_COMPLETE()) {
        APP.innerHTML += `<button id="auto-complete">AUTO COMPLETE!!</button>`;
      }
    }
    this.isWin();
  }

  isWin() {
    if (
      this.solitaire.store.length === 0 &&
      this.solitaire.getCardInStacks().length === 52
    ) {
      setTimeout(() => {
        alert("✨ 축하드립니다! 게임에서 승리하셨습니다 ✨");
        if (confirm("새 게임을 시작하시겠습니까?")) {
          this.regame();
        } else {
          /*  */
        }
      }, 100);
    }
  }

  regame() {
    this.solitaire.regame();
    this.render();
    this.soundShuffle();
    this.auto_complete = false;
    this.active_auto_complete = false;
  }

  checkAutoStack() {
    const isEmptyStore = this.solitaire.store.length === 0;
    const isEmptyPick = this.solitaire.pick.length === 0;
    const isOpenInDeck = this.solitaire
      .getCardInDecks()
      .every((card) => card.isOpen);
    if (isOpenInDeck && isEmptyPick && isEmptyStore) {
      console.log(isEmptyPick);
      console.log(isEmptyStore);
      if (
        !this.active_auto_complete &&
        !this.auto_complete &&
        this.solitaire.getCardInGrounds().length > 0
      ) {
        this.auto_complete = true;
        this.active_auto_complete = false;
      }
      console.log("auto complete");
    }
    console.log(this.auto_complete);
    console.log(this.active_auto_complete);
    // if (this.active_auto_complete) {
    //   AUTO_COMPLETE().remove();
    // }
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
    var audio = new Audio(
      (import.meta.env.DEV ? "" : "/new-solitaire") + "/sounds/pick_sound.mp4"
    );
    audio.currentTime = 0.05;
    audio.volume = 0.7;
    audio.play();
  }
  soundShuffle() {
    var audio = new Audio(
      (import.meta.env.DEV ? "" : "/new-solitaire") +
        "/sounds/shuffle_sound.mp4"
    );
    audio.currentTime = 0.01;
    audio.volume = 0.5;
    audio.play();
  }
}
