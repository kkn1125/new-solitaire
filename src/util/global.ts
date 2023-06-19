export const CARD_ENV: {
  TYPES: OnlyUsableCard[];
  SHAPE: { [k in OnlyUsableCard]: string };
  TAG: {
    [k in number]: string | number;
  };
  AMOUNT: number;
} = {
  TYPES: ["heart", "diamond", "spade", "clover"],
  SHAPE: {
    heart: "♥",
    diamond: "◆",
    spade: "♠",
    clover: "♣",
  },
  TAG: {
    "1": "A",
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": "J",
    "12": "Q",
    "13": "K",
  },
  AMOUNT: 13,
};

export const APP = document.querySelector("#app") as HTMLDivElement;
export const GROUND = () => document.querySelector("#ground") as HTMLDivElement;
export const STACK = () => document.querySelector("#stack") as HTMLDivElement;
export const PICK = () => document.querySelector("#pick") as HTMLDivElement;
export const DECK = () => document.querySelector("#deck") as HTMLDivElement;
export const RESTART = () =>
  document.querySelector("#restart") as HTMLDivElement;
export const TIMER = () => document.querySelector("#timer") as HTMLDivElement;
export const MOVE = () => document.querySelector("#move") as HTMLDivElement;
export const SCORE = () => document.querySelector("#score") as HTMLDivElement;
export const THEME = () => document.querySelector("#theme") as HTMLDivElement;
export const EFFECT = () => document.querySelector("#effect") as HTMLDivElement;
export const BGM = () => document.querySelector("#bgm") as HTMLDivElement;

export const AUTO_COMPLETE = () =>
  document.querySelector("#auto-complete") as HTMLDivElement;

/* images */
export const IMAGE = (filename: string, number: number) =>
  `${
    import.meta.env.DEV ? "" : "/new-solitaire"
  }/cards/${filename}_${number}.png`;

/* sounds */
export const pickSound = () =>
  document.querySelector("#pick-sound") as HTMLAudioElement;

export const effectSounds = {
  pick: "/sounds/pick_sound.mp4",
  shuffle: "/sounds/shuffle_sound.mp4",
};

export const bgmSounds = [
  "/bgm/daehanghaesidae_bar.mp4",
  "/bgm/daehanghaesidae_eastern_mediterranean_sea.mp4",
  "/bgm/daehanghaesidae_japan.mp4",
  "/bgm/daehanghaesidae_marseille.mp4",
];

/* backgrounds */
export const themes = [
  "theme-1",
  "theme-2",
  "theme-3",
  "theme-4",
  "theme-5",
  "theme-6",
  "theme-7",
];
