export class EndOfWorldGame {
  constructor() {}

  getDays() {
    return "Faltam " + Math.floor(Math.random() * 365 * 20) + " dias!";
  }
}
