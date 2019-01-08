class Model {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.buffer = [];

        this.init();
    }

    init() {
        this._forEachRow(r => {
            this.cells[r] = [];
            this.buffer[r] = [];

            this._forEachCell(c => {
                this.cells[r][c] = 0;
                this.buffer[r][c] = 0;
            });
        });
    }

    toggleCellState(row, col) {
        this.cells[row][col] = Number(!Boolean(this.cells[row][col]));

        this.onChange(this.cells);
    }

    reset() {
        this._forEachCell((r, c) => this.cells[r][c] = 0);

        this.onChange(this.cells);
    }

    randomize() {
        this._forEachCell((r, c) => this.cells[r][c] = Math.round(Math.random()));

        this.onChange(this.cells);
    }

    next() {
        this._forEachCell((r, c) => {
            let isAlive = this.cells[r][c];
            let neighbors = this._countNeighbors(r, c);

            if (isAlive) {
                if (neighbors < 2) { // cell dies
                    this.buffer[r][c] = 0;
                } else if (neighbors === 2 || neighbors === 3) { // cell lives
                    this.buffer[r][c] = 1;
                } else if (neighbors > 3) { // cell dies
                    this.buffer[r][c] = 0;
                }
            } else {
                if (neighbors === 3) {
                    this.buffer[r][c] = 1; // cell becomes alive
                }
            }
        });

        this._resetBuffer();
        this.onChange(this.cells);
    }

    _countNeighbors(row, col) {
        let cells = this.cells;
        let size = this.size;
        let count = 0;

        if (row - 1 >= 0) { // top
            if (cells[row - 1][col] === 1) count += 1;
        }

        if (row - 1 >= 0 && col - 1 >= 0) { // top left
            if (cells[row - 1][col - 1] === 1) count += 1;
        }

        if (row - 1 >= 0 && col + 1 < size) { // top right
            if (cells[row - 1][col + 1] === 1) count += 1;
        }

        if (col - 1 >= 0) { // left
            if (cells[row][col - 1] === 1) count += 1;
        }

        if (col + 1 < size) { // right
            if (cells[row][col + 1] === 1) count += 1;
        }

        if (row + 1 < size) { // bottom
            if (cells[row + 1][col] === 1) count += 1;
        }

        if (row + 1 < size && col - 1 >= 0) { // bottom left
            if (cells[row + 1][col - 1] === 1) count += 1;
        }

        if (row + 1 < size && col + 1 < size) { // bottom right
            if (cells[row + 1][col + 1] === 1) count += 1;
        }

        return count;
    }

    _forEachRow(fn) {
        for (let r = 0; r < this.size; r++) {
            fn(r);
        }
    }

    _forEachCell(fn) {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                fn(r, c);
            }
        }
    }

    _resetBuffer() {
        this._forEachCell((r, c) => {
            this.cells[r][c] = this.buffer[r][c];
            this.buffer[r][c] = 0;
        });
    }
}