export default class Logger {
  context: string = "system";
  mode: boolean;

  constructor(context: string) {
    context && (this.context = context);
    this.mode = import.meta.env.DEV;
  }

  setContext(context: string) {
    this.context = context;
    this.log = (() =>
      this.mode
        ? console.log.bind(this, `[${this.context.toUpperCase()}]`)
        : () => {})();
  }

  log = (() =>
    this.mode
      ? console.log.bind(this, `[${this.context.toUpperCase()}]`)
      : () => {})();
}
