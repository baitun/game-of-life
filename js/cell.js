class Cell {
    constructor(element, row, col, alive = false) {
        this.element = element;
        this.row = row;
        this.col = col;
        this._alive = alive;

        this.init();
    }

    get alive() {
        return this._alive;
    }

    set alive(value) {
        this._alive = value;

        this.element.classList.toggle('alive', this._alive);
    }

    init() {
        this.element.className = 'cell';
        this.alive = this._alive;
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        this.alive = !this.alive;
    }
}