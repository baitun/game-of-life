export default class Cell {
    constructor(row, col, alive = false) {
        this.element = null;
        this.row = row;
        this.col = col;
        this._alive = alive;
    }
    get isAlive() {
        return this._alive;
    }
    toggleState(isAlive = !this._alive) {
        this._alive = isAlive;
        if (this.element)
            this.element.classList.toggle("alive", this._alive);
    }
    resetState() {
        this._alive = false;
    }
    randomState() {
        this._alive = Math.random() > 0.5;
    }
}
