declare type CardType =
  | "diamond"
  | "heart"
  | "spade"
  | "clover"
  | "back"
  | "empty";
declare type CardState =
  | "deck"
  | "ground"
  | "pick"
  | "stack"
  | "temporary"
  | "none";
declare type CardColor = "red" | "black" | "none";
declare type OnlyUsableCard = Exclude<CardType, "empty" | "back">;
declare type CardDeck = {
  [k in OnlyUsableCard]: Card[];
};
