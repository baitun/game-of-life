import Cell from "./Cell.js";

export default class Grid {
  public gridWidth: number;
  public gridHeight: number;
  public gridRows: number;
  public gridCols: number;
  private _grid: Cell[][];
  private _nextGrid: boolean[][];
  public element: HTMLElement | null;
  public cellWidth: number;
  public cellHeight: number;
  constructor(width: number, height: number, rows: number, cols: number) {
    this.gridWidth = width;
    this.gridHeight = height;
    this.gridRows = rows;
    this.gridCols = cols;

    this.cellWidth = Math.round(this.gridWidth / this.gridCols);
    this.cellHeight = Math.round(this.gridHeight / this.gridRows);

    this._grid = new Array<Cell[]>();
    this._nextGrid = [];
    this.element = null;
    this._init();
  }

  private _init() {
    const table = document.createElement("table");
    table.className = "grid";

    for (let i = 0; i < this.gridRows; i++) {
      const tr = document.createElement("tr");
      tr.className = "row";

      this._grid[i] = [];
      this._nextGrid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        const cell = new Cell(i, j);
        const td = cell.element;
        this._grid[i][j] = cell;
        this._nextGrid[i][j] = false;
        if (td) tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    this.element = table;
  }

  public next() {
    this._forEachCell((cell: Cell) => {
      const numberOfNeighbors = this._countNeighbours(cell);
      const i = cell.row,
        j = cell.col;
      if (cell.alive) {
        if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
          this._nextGrid[i][j] = false;
        } else {
          this._nextGrid[i][j] = true;
        }
      } else {
        if (numberOfNeighbors == 3) {
          this._nextGrid[i][j] = true;
        }
      }
    });
    this._forEachCell((cell: Cell) => {
      const i = cell.row,
        j = cell.col;
      cell.toggleState(this._nextGrid[i][j]);
    });
  }

  public randomize() {
    this._forEachCell((cell: Cell) => cell.randomState());
  }

  public reset() {
    this._forEachCell((cell: Cell) => cell.resetState());
  }

  private _forEachCell(fn: (cell: Cell) => void) {
    for (let i = 0; i < this.gridRows; i++) {
      for (let j = 0; j < this.gridCols; j++) {
        const cell = this._grid[i][j];
        fn(cell);
      }
    }
  }

  private _countNeighbours(cell: Cell) {
    let count = 0;
    let i = cell.row,
      j = cell.col;
    if (this._isCellAlive(i - 1, j)) count++;

    // if (i - 1 >= 0) {
    //   count += this._grid[i - 1][j].alive;
    //   if (j - 1 >= 0) {
    //     count += this._grid[i - 1][j - 1].alive;
    //   }
    //   if (j + 1 < this.gridCols) {
    //     count += this._grid[i - 1][j + 1].alive;
    //   }
    // }
    // if (j - 1 >= 0) {
    //   count += this._grid[i][j - 1].alive;
    // }
    // if (i + 1 < this.gridRows) {
    //   count += this._grid[i + 1][j].alive;
    //   if (j - 1 >= 0) {
    //     count += this._grid[i + 1][j - 1].alive;
    //   }
    //   if (j + 1 < this.gridCols) {
    //     count += this._grid[i + 1][j + 1].alive;
    //   }
    // }
    // if (j + 1 < this.gridRows) {
    //   count += this._grid[i][j + 1].alive;
    // }
    return count;
  }

  private _isCellAlive(row: number, col: number) {
    const cell = this._grid[row][col];
    return cell.isAlive;
  }
}
