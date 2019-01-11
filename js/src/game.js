import Grid from './grid.js';

export default class Game {
    constructor(rows, cols) {
        this._grid = new Grid(rows, cols);
        this.isPlaying = false;
        this.speed = 0;
        this.interval = null;

        this.onStateChange = Function.prototype;
        
        this.next = this.next.bind(this);
    }

    get grid() {
        return this._grid.cells;
    }

    toggleCellState(row, col) {
        const grid = this._grid.toggleCellState(row, col);

        this.onStateChange(grid);
    }

    next() {
        const nextGrid = this._grid.next();

        this.onStateChange(nextGrid);
    }

    randomize() {
        if (this.isPlaying) return;

        const randomGrid = this._grid.randomize();

        this.onStateChange(randomGrid);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this._startIterval();
    }

    pause() {
        this.isPlaying = false;
        this._stopInterval();
    }

    reset() {
        this.pause();
        this.speed = 0;

        const resetGrid = this._grid.reset();

        this.onStateChange(resetGrid);
    }

    changeSpeed(value) {
        if (!this.isPlaying) return;
        
        this.speed = value;

        this._stopInterval();
        this._startIterval();
    }

    _startIterval() {
        this.interval = setInterval(this.next, 1000 - this.speed);
    }

    _stopInterval() {
        clearInterval(this.interval);
    }
}