import Cell from "./Cell.js";
export default class Grid {
    constructor(width, height, rows, cols) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.gridRows = rows;
        this.gridCols = cols;
        this.cellWidth = Math.round(this.gridWidth / this.gridCols);
        this.cellHeight = Math.round(this.gridHeight / this.gridRows);
        this._grid = new Array();
        this._nextGrid = [];
        this.element = null;
        this._init();
    }
    _init() {
        const table = document.createElement("table");
        table.className = "grid";
        for (let i = 0; i < this.gridRows; i++) {
            const tr = document.createElement("tr");
            tr.className = "row";
            this._grid[i] = [];
            this._nextGrid[i] = [];
            for (let j = 0; j < this.gridCols; j++) {
                const cell = new Cell(this.cellWidth, this.cellHeight, i, j);
                const td = cell.element;
                this._grid[i][j] = cell;
                this._nextGrid[i][j] = false;
                if (td)
                    tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element = table;
    }
    next() {
        this._forEachCell((cell) => {
            const numberOfNeighbors = this._countNeighbours(cell);
            const i = cell.row, j = cell.col;
            if (cell.alive) {
                if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
                    this._nextGrid[i][j] = false;
                }
                else {
                    this._nextGrid[i][j] = true;
                }
            }
            else {
                if (numberOfNeighbors == 3) {
                    this._nextGrid[i][j] = true;
                }
            }
        });
        this._forEachCell((cell) => {
            const i = cell.row, j = cell.col;
            cell.toggle(this._nextGrid[i][j]);
        });
    }
    randomize() {
        this._forEachCell((cell) => {
            const isAlive = Math.random() > 0.5;
            cell.toggle(isAlive);
        });
    }
    reset() {
        this._forEachCell((cell) => {
            cell.toggle(false);
            this._nextGrid[cell.row][cell.col] = false;
        });
    }
    _forEachCell(fn) {
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                const cell = this._grid[i][j];
                fn(cell);
            }
        }
    }
    _countNeighbours(cell) {
        let count = 0;
        let i = cell.row, j = cell.col;
        if (i - 1 >= 0) {
            count += this._grid[i - 1][j].alive;
            if (j - 1 >= 0) {
                count += this._grid[i - 1][j - 1].alive;
            }
            if (j + 1 < this.gridCols) {
                count += this._grid[i - 1][j + 1].alive;
            }
        }
        if (j - 1 >= 0) {
            count += this._grid[i][j - 1].alive;
        }
        if (i + 1 < this.gridRows) {
            count += this._grid[i + 1][j].alive;
            if (j - 1 >= 0) {
                count += this._grid[i + 1][j - 1].alive;
            }
            if (j + 1 < this.gridCols) {
                count += this._grid[i + 1][j + 1].alive;
            }
        }
        if (j + 1 < this.gridRows) {
            count += this._grid[i][j + 1].alive;
        }
        return count;
    }
    _isNeighbourAlive(row, col) {
        return Boolean(this._grid[row][col].alive);
    }
}
