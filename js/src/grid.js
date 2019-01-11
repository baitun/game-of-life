import Cell from './cell.js';

export default class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        this._buffer = [];

        this.onCellStateChange = Function.prototype;
        this.toggleCellState = this.toggleCellState.bind(this);

        this._init();
    }

    _init() {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            this._buffer[i] = [];

            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = new Cell(i, j);
                this._buffer[i][j] = false;
            }
        }
    }

    _forEachCell(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                fn(this.cells[i][j]);
            }
        }
    }

    _countNeighbors({ row, col }) {
        const { rows, cols, cells } = this;
        let count = 0;

        if (row - 1 >= 0) { // ↑
            if (cells[row - 1][col].alive) count += 1;
        }

        if (row - 1 >= 0 && col - 1 >= 0) { // ↖
            if (cells[row - 1][col - 1].alive) count += 1;
        }

        if (row - 1 >= 0 && col + 1 < cols) { // ↗
            if (cells[row - 1][col + 1].alive) count += 1;
        }

        if (col - 1 >= 0) { // ←
            if (cells[row][col - 1].alive) count += 1;
        }

        if (col + 1 < cols) { // →
            if (cells[row][col + 1].alive) count += 1;
        }

        if (row + 1 < rows) { // ↓
            if (cells[row + 1][col].alive) count += 1;
        }

        if (row + 1 < rows && col - 1 >= 0) { // ↙
            if (cells[row + 1][col - 1].alive) count += 1;
        }

        if (row + 1 < rows && col + 1 < cols) { // ↘
            if (cells[row + 1][col + 1].alive) count += 1;
        }

        return count;
    }

    toggleCellState(row, col) {
        const cell = this.cells[row][col];
        
        cell.toggleState();

        return this.cells;
    }

    next() {
        const buffer = this._buffer;

        this._forEachCell(cell => {
            const numberOfNeighbors = this._countNeighbors(cell);
            const { row, col, alive } = cell;

            if (alive) {
                if (numberOfNeighbors < 2) { // если соседей < 2 -> клетка умирает
                    buffer[row][col] = false;
                } else if (numberOfNeighbors === 2 || numberOfNeighbors === 3) { // если соседа 2 или 3 -> клетка продолжает жить
                    buffer[row][col] = true;
                } else if (numberOfNeighbors > 3) { // если соседей > 3 -> клетка умирает
                    buffer[row][col] = false;
                }
            } else {
                if (numberOfNeighbors === 3) { // если соседа 3 -> клетка оживает
                    buffer[row][col] = true;
                }
            }
        });

        this._forEachCell(cell => {
            const shouldCellLive = buffer[cell.row][cell.col];

            cell.alive = shouldCellLive;

            buffer[cell.row][cell.col] = false;
        });

        return this.cells;
    }

    reset() {
        this._forEachCell(cell => cell.resetState());

        return this.cells;
    }

    randomize() {
        this._forEachCell(cell => cell.setRandomState());

        return this.cells;
    }
}