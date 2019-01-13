import Grid from "./Grid.js";
import { Button, StartButton } from "./Buttons.js";

export default class Game {
  public gridRows: number;
  public gridCols: number;
  public grid: Grid;
  public isPlaing: boolean = false;
  public speed: number = 1000;
  public interval: number = 0;

  constructor(rows: number, cols: number) {
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

  private _startInterval() {
    this.isPlaing = true;
    this.interval = setInterval(this.next, this.speed);
  }

  private _stopInterval() {
    this.isPlaing = false;
    clearInterval(this.interval);
  }
}
