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
export const RESTART = () => document.querySelector("#restart") as HTMLDivElement;

/* images */
export const IMAGE = (filename: string, number: number) =>
  `${
    import.meta.env.DEV ? "" : "/new-solitaire"
  }/cards/${filename}_${number}.png`;
