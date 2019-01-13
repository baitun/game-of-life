export default class Cell {
    constructor(width, height, row, col, alive = false) {
        this.element = null;
        this.width = width;
        this.height = height;
        if (this.width != this.height)
            this.width = this.height = Math.min(this.width, this.height);
        this.row = row;
        this.col = col;
        this._alive = alive;
        this._init();
    }
    toggle(isAlive = !this._alive) {
        this._alive = isAlive;
        if (this.element)
            this.element.classList.toggle("alive", this._alive);
    }
    get alive() {
        return Number(this._alive);
    }
    _init() {
        const td = document.createElement("td");
        td.className = "cell";
        td.width = String(this.width);
        td.height = String(this.height);
        td.addEventListener("click", this._handleClick.bind(this));
        this.element = td;
    }
    _handleClick() {
        this.toggle();
    }
}
