import Grid from "./Grid.js";
import { Button, StartButton } from "./Buttons.js";
export default class Game {
    constructor(width, height, rows, cols, root) {
        this.isPlaing = false;
        this.speed = 1000;
        this.interval = 0;
        this.element = null;
        this.controlsElement = null;
        this.gridWidth = width;
        this.gridHeight = height;
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
        this._createControls();
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
        this._stopInterval();
        this._startInterval();
    }
    _createControls() {
        const startButton = new StartButton(() => {
            if (this.isPlaing) {
                this.pause();
                startButton.showPlay();
            }
            else {
                this.play();
                startButton.showPause();
            }
        });
        const resetButton = new Button("reset", () => {
            this.reset();
            startButton.showPlay();
        });
        const randomizeButton = new Button("randomize", () => {
            this.randomize();
        });
        const speedSlider = document.createElement("input");
        speedSlider.type = "range";
        speedSlider.min = "0";
        speedSlider.max = "900";
        speedSlider.step = "100";
        speedSlider.value = String(1000 - this.speed);
        speedSlider.addEventListener("input", () => {
            this.changeSpeed(Number(speedSlider.value));
        });
        const container = document.createElement("div");
        container.className = "controls";
        container.append(startButton.element, resetButton.element, randomizeButton.element, speedSlider);
        this.controlsElement = container;
    }
    _startInterval() {
        this.interval = setInterval(this.next, this.speed);
    }
    _stopInterval() {
        clearInterval(this.interval);
    }
}
