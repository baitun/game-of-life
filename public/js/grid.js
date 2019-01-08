class Grid {
    constructor({ element, size }) {
        this.element = element;
        this.size = size;
        this.table = document.createElement('table');
        this.cells = new Array(this.size);
        this.buffer = new Array(this.size);

        this.init();
    }

    init() {
        for (let r = 0; r < this.size; r++) {
            let row = document.createElement('tr');
            this.cells[r] = new Array(this.size);
            this.buffer[r] = new Array(this.size);

            for (let c = 0; c < this.size; c++) {
                let cell = new Cell({
                    element: document.createElement('td'),
                    row: r,
                    col: c
                });

                this.cells[r][c] = cell;
                this.buffer[r][c] = false;
                
                row.appendChild(cell.element);
            }

            this.table.appendChild(row);
        }

        this.element.appendChild(this.table);
    }

    countNeighbors(cell) {
        let { row, col } = cell;
        let cells = this.cells;
        let size = this.size;
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

    reset() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let cell = this.cells[r][c];
                cell.alive = false;
            }
        }
    }

    resetBuffer() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                this.cells[r][c].alive = this.buffer[r][c];
                this.buffer[r][c] = false;
            }
        }
    }

    randomize() {
        this.reset();

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let isAlive = Math.round(Math.random());

                if (isAlive === 1) {
                    let cell = this.cells[r][c];
                    cell.alive = isAlive;
                }
            }
        }
    }

    next() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let cell = this.cells[r][c];
                let neighbors = this.countNeighbors(cell);

                if (cell.alive) {
                    if (neighbors < 2) { // cell dies
                        this.buffer[r][c] = false;
                    } else if (neighbors === 2 || neighbors === 3) { // cell lives
                        this.buffer[r][c] = true;
                    } else if (neighbors > 3) { // cell dies
                        this.buffer[r][c] = false;
                    }
                } else {
                    if (neighbors === 3) {
                        this.buffer[r][c] = true; // cell becomes alive
                    }
                }
            }
        }

        this.resetBuffer();
    }
}