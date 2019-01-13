export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.view.onGridClick = args => console.log(args);
    }
}
