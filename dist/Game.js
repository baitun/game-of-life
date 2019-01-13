import Grid from "./Grid.js";
export default class Game {
    constructor(rows, cols) {
        this.isPlaing = false;
        this.speed = 1000;
        this.interval = 0;
        this.gridRows = rows;
        this.gridCols = cols;
        this.root = root;
        this.grid = new Grid(width, height, rows, cols);
        this.element = this.grid.element;
        this.next = this.next.bind(this);
        this._init();
    }
    _init() {
        if (this.root && this.element)
            this.root.appendChild(this.element);
        if (this.root && this.controlsElement)
            this.root.appendChild(this.controlsElement);
    }
    pause() {
        this.isPlaing = false;
        this._stopInterval();
    }
    play() {
        this.isPlaing = true;
        this._startInterval();
    }
    reset() {
        this.pause();
        this.grid.reset();
    }
    randomize() {
        if (this.isPlaing)
            return;
        this.reset();
        this.grid.randomize();
    }
    next() {
        this.grid.next();
    }
    changeSpeed(value) {
        this.speed = 1000 - value;
        if (this.isPlaing) {
            this._stopInterval();
            this._startInterval();
        }
    }
    _startInterval() {
        this.isPlaing = true;
        this.interval = setInterval(this.next, this.speed);
    }
    _stopInterval() {
        this.isPlaing = false;
        clearInterval(this.interval);
    }
}
