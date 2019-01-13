import Game from "./Game";
import View from "./View";

export default class Controller {
  public game: Game;
  public view: View;
  constructor(game: Game, view: View) {
    this.game = game;
    this.view = view;

    this.view.onGridClick = args => console.log(args);
  }
}
