class Grid {
    constructor(element, size) {
        this.element = element;
        this.size = size;
        this.table = document.createElement('table');
        this.cells = [];
        this.buffer = [];

        this.init();
    }

    init() {
        for (let r = 0; r < this.size; r++) {
            const row = document.createElement('tr');
            this.cells[r] = [];
            this.buffer[r] = [];
            
            for (let c = 0; c < this.size; c++) {
                const cell = new Cell(document.createElement('td'), r, c);
                
                this.cells[r][c] = cell;
                this.buffer[r][c] = false;
                
                row.appendChild(cell.element);
            }

            this.table.appendChild(row);
        }

        this.element.appendChild(this.table);
    }

    next() {
        this._forEachCell((r, c) => {
            const cell = this.cells[r][c];
            const neighbors = this._countNeighbors(cell);

            if (cell.alive) {
                if (neighbors < 2) { // cell dies
                    this.buffer[r][c] = false;
                } else if (neighbors === 2 || neighbors === 3) { // cell lives
                    this.buffer[r][c] = true;
                } else if (neighbors > 3) { // cell dies
                    this.buffer[r][c] = false;
                }
            } else {
                if (neighbors === 3) { // cell becomes alive
                    this.buffer[r][c] = true;
                }
            }
        });

        this._forEachCell((r, c) => {
            this.cells[r][c].alive = this.buffer[r][c];
            this.buffer[r][c] = false;
        });
    }

    reset() {
        this._forEachCell((r, c) => this.cells[r][c].alive = false);
    }

    randomize() {
        this._forEachCell((r, c) => this.cells[r][c].alive = Math.round(Math.random()) === 0);
    }

    _forEachCell(fn) {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                fn(r, c);
            }
        }
    }

    _countNeighbors({ row, col }) {
        const cells = this.cells;
        const size = this.size;
        let count = 0;

        if (row - 1 >= 0) { // top
            if (cells[row - 1][col].alive) count += 1;
        }

        if (row - 1 >= 0 && col - 1 >= 0) { // top left
            if (cells[row - 1][col - 1].alive) count += 1;
        }

        if (row - 1 >= 0 && col + 1 < size) { // top right
            if (cells[row - 1][col + 1].alive) count += 1;
        }

        if (col - 1 >= 0) { // left
            if (cells[row][col - 1].alive) count += 1;
        }

        if (col + 1 < size) { // right
            if (cells[row][col + 1].alive) count += 1;
        }

        if (row + 1 < size) { // bottom
            if (cells[row + 1][col].alive) count += 1;
        }

        if (row + 1 < size && col - 1 >= 0) { // bottom left
            if (cells[row + 1][col - 1].alive) count += 1;
        }

        if (row + 1 < size && col + 1 < size) { // bottom right
            if (cells[row + 1][col + 1].alive) count += 1;
        }

        return count;
    }
}