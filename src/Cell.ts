export default class Cell {
  public row: number;
  public col: number;
  private _alive: boolean;
  public element: HTMLTableDataCellElement | null = null;
  constructor(row: number, col: number, alive: boolean = false) {
    this.row = row;
    this.col = col;
    this._alive = alive;
  }

  get isAlive() {
    return this._alive;
  }

  public toggleState(isAlive = !this._alive) {
    this._alive = isAlive;
    if (this.element) this.element.classList.toggle("alive", this._alive);
  }

  public resetState() {
    this._alive = false;
  }

  public randomState() {
    this._alive = Math.random() > 0.5;
  }
}
