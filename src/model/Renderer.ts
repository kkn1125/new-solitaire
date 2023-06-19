import {
  APP,
  AUTO_COMPLETE,
  BGM,
  CARD_ENV,
  DECK,
  EFFECT,
  effectSounds,
  GROUND,
  MOVE,
  PICK,
  SCORE,
  STACK,
  TIMER,
} from "../util/global";
import { formatFromCountdown } from "../util/tool";
import Card from "./Card";
import Solitaire from "./Solitaire";
import icons from "../../public/icon/icons";

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
      const form = formatFromCountdown((startTime += 0.1));
      let count = 9;
      // let loop = setInterval(() => {
      //   if (count === 0) {
      //     clearTimeout(loop);
      //   }
      //   TIMER().innerHTML = `${form}${count}`;
      //   count--;
      // }, 1);
      TIMER().innerHTML = `${form}`;
    }, 1000 /* 10 */);
  }

  layout() {
    APP.innerHTML = `
      <div id="top-bar">
        <div></div>
        <div id="options">
          <div id="score" class="shape" data-game-score="0"></div>
          <div id="timer" class="shape"></div>
          <div id="move" class="shape" data-game-move="0"></div>
        </div>
        <button id="theme" class="top-circle-btn">
          ${icons.palette.outerHTML}
        </button>
        <button id="effect" class="top-circle-btn">
          🃏
        </button>
        <button id="bgm" class="top-circle-btn">
          🔊
        </button>
      </div>
      <div class="slide-bgm">
        <!--<span>
        ${
          this.solitaire.bgmList
            .find((bgm) => bgm.active)
            .audio.src.split(/daehanghaesidae_/g)[1]
            .replace(/_/g, " ")
            .split(".")[0]
        }
        </span>-->
      </div>
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
            
            <div class="gap"></div>
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
    if (Object.entries(stacks).some((typeStack) => typeStack[1].length > 0)) {
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
  }

  pick() {
    const picks = this.solitaire.pick.slice(-3);
    PICK().innerHTML = `<div class="empty"></div>`;
    return picks.forEach((pick, order) => {
      PICK().innerHTML += this.pickCardForm(pick, order);
    });
  }

  render() {
    this.startBgm();
    this.layout();
    this.renderTimer();
    this.update();
  }

  update() {
    this.theme();
    this.ground();
    this.pick();
    this.stack();
    this.isEmptyDeck();
    this.move();
    this.score();
    this.effect();
    this.toggleBgm();
    this.checkAutoStack();
    if (!this.active_auto_complete) {
      if (this.auto_complete && !AUTO_COMPLETE()) {
        APP.innerHTML += `<button id="auto-complete">AUTO COMPLETE!!</button>`;
      }
    }
    this.isWin();
  }

  startBgm() {
    this.solitaire.bgmList = this.solitaire.bgmList.map((bgm) => {
      bgm.active = false;
      bgm.audio.pause();
      bgm.audio.volume = 0;
      bgm.audio.currentTime = 0;
      return bgm;
    });
    const bgm =
      this.solitaire.bgmList[
        Math.floor(this.solitaire.bgmList.length * Math.random())
      ];
    if (bgm) {
      bgm.active = true;
      bgm.audio.volume = 0.3;
      bgm.audio.onended = () => {
        bgm.active = false;
        bgm.audio.volume = 0;
        bgm.audio.pause();
        bgm.audio.muted = true;
        const next =
          this.solitaire.bgmList[(bgm.id - 1) % this.solitaire.bgmList.length];
        next.active = true;
        next.audio.muted = false;
        next.audio.volume = 0.3;
        next.audio.play();
        bgm.audio.onended = null;
      };
    }
  }

  effect() {
    if (!this.solitaire.effect && !EFFECT().classList.contains(".not-use")) {
      EFFECT().classList.add("not-use");
    } else {
      EFFECT().classList.remove("not-use");
    }
  }

  toggleBgm() {
    if (!this.solitaire.bgm && !BGM().classList.contains(".not-use")) {
      BGM().classList.add("not-use");
      const bgm = this.solitaire.bgmList.find((bgm) => bgm.active);
      // bgm.active = false;
      bgm.audio.muted = true;
      bgm.audio.pause();
    } else {
      BGM().classList.remove("not-use");
      const bgm = this.solitaire.bgmList.find((bgm) => bgm.active);
      console.log(bgm);
      // bgm.active = false;
      bgm.audio.muted = false;
      bgm.audio.play();
      console.log(bgm.audio.src);
    }
  }

  theme() {
    document.body.classList.forEach((cls) =>
      document.body.classList.remove(cls)
    );
    document.body.classList.add(this.solitaire.currentTheme);
  }

  move() {
    MOVE().dataset.gameMove = this.solitaire.move.toString();
  }

  score() {
    SCORE().dataset.gameScore = this.solitaire.score.toString();
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
    this.auto_complete = false;
    this.active_auto_complete = false;
    this.solitaire.regame();
    this.render();
    this.soundShuffle();
  }

  checkAutoStack() {
    const isEmptyStore = this.solitaire.store.length === 0;
    const isEmptyPick = this.solitaire.pick.length === 0;
    const isOpenInGround = this.solitaire
      .getCardInGrounds()
      .every((card) => card.isOpen);
    if (isOpenInGround && isEmptyPick && isEmptyStore) {
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
  }

  isEmptyDeck() {
    if (this.solitaire.store.length === 0) {
      DECK().querySelector(".back").classList.add("zero");
    } else {
      DECK().querySelector(".back").classList.remove("zero");
    }

    const inPick = this.solitaire.getCardInPicks().length;
    const inDeck = this.solitaire.getCardInDecks().length + inPick;

    DECK().dataset.pickLen = inPick.toString();
    DECK().dataset.storeLen = inDeck.toString();
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
    if (!this.solitaire.effect) return;
    const audio = new Audio(
      (import.meta.env.DEV ? "" : "/new-solitaire") + effectSounds.pick
    );
    audio.currentTime = 0.02;
    audio.volume = 0.7;
    audio.play();
  }

  soundShuffle() {
    if (!this.solitaire.effect) return;
    const audio = new Audio(
      (import.meta.env.DEV ? "" : "/new-solitaire") + effectSounds.shuffle
    );
    audio.currentTime = 0.01;
    audio.volume = 0.5;
    audio.play();
  }

  playBgm() {}
}
