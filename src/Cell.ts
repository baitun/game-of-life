export default class Cell {
  public width: number;
  public height: number;
  public row: number;
  public col: number;
  private _alive: boolean;
  public element: HTMLTableDataCellElement | null = null;
  constructor(
    width: number,
    height: number,
    row: number,
    col: number,
    alive: boolean = false
  ) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this._alive = alive;
    this._init();
  }

  public toggle(isAlive = !this._alive) {
    this._alive = isAlive;
    if (this.element) this.element.classList.toggle("alive", this._alive);
  }

  get alive() {
    return Number(this._alive);
  }

  private _init() {
    const td = document.createElement("td");
    td.className = "cell";
    td.width = String(this.width);
    td.height = String(this.height);

    td.addEventListener("click", this._handleClick.bind(this));
    this.element = td;
  }

  private _handleClick() {
    this.toggle();
  }
}
