import palette from "./palette";

const convertStringToEl = (string: string) =>
  new DOMParser().parseFromString(string, "text/html").body.children[0];

export default {
  palette: convertStringToEl(palette),
};
