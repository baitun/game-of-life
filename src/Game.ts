import Grid from "./Grid.js";
import { Button, StartButton } from "./Buttons.js";

export default class Game {
  public gridWidth: number;
  public gridHeight: number;
  public gridRows: number;
  public gridCols: number;
  public grid: Grid;
  public isPlaing: boolean = false;
  public speed: number = 1000;
  public interval: number = 0;
  public root: HTMLElement | null;
  public element: HTMLElement | null = null;
  public controlsElement: HTMLElement | null = null;

  constructor(
    width: number,
    height: number,
    rows: number,
    cols: number,
    root: HTMLElement | null
  ) {
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

  private _init() {
    if (this.root && this.element) this.root.appendChild(this.element);
    this._createControls();
    if (this.root && this.controlsElement)
      this.root.appendChild(this.controlsElement);
  }

  public pause() {
    this.isPlaing = false;
    this._stopInterval();
  }

  public play() {
    this.isPlaing = true;
    this._startInterval();
  }

  public reset() {
    this.pause();
    this.grid.reset();
  }

  public randomize() {
    if (this.isPlaing) return;
    this.reset();
    this.grid.randomize();
  }

  public next() {
    this.grid.next();
  }

  public changeSpeed(value: number) {
    this.speed = 1000 - value;
    if (this.isPlaing) {
      this._stopInterval();
      this._startInterval();
    }
  }

  private _createControls() {
    const startButton = new StartButton(() => {
      if (this.isPlaing) {
        this.pause();
        startButton.showPlay();
      } else {
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
    container.append(
      startButton.element,
      resetButton.element,
      randomizeButton.element,
      speedSlider
    );
    this.controlsElement = container;
  }

  private _startInterval() {
    this.isPlaing = true;
    this.interval = setInterval(this.next, this.speed);
  }

  private _stopInterval() {
    this.isPlaing = false;
    clearInterval(this.interval);
  }
}
