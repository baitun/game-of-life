export default class Cell {
    constructor(row, col, alive = false) {
        this.row = row;
        this.col = col;
        this.alive = alive;
    }

    toggleState() {
        this.alive = !this.alive;
    }

    resetState() {
        this.alive = false;
    }

    setRandomState() {
        this.alive = !!Math.round(Math.random());
    }
}