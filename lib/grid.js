const Cell = require('./cell');

class Grid {
    /**
     * Создает сетку
     * @param {number} size - Размер сетки
     * @param {boolean} [randomize=false] - Случайное определение состояния клеток в сетке
     * @returns {[[{row: number, col: number, alive: boolean}]]} - Сетка
     */
    constructor(size, randomize = false) {
        this.size = size;

        this.init(randomize);
    }

    init(randomize) {
        this.cells = new Array(this.size);

        for (let r = 0; r < this.size; r++) {
            this.cells[r] = new Array(this.size);

            for (let c = 0; c < this.size; c++) {
                if (randomize) {
                    let isAlive = Math.random() < .5;

                    this.cells[r][c] = new Cell(r, c, isAlive);
                } else {
                    this.cells[r][c] = new Cell(r, c);
                }
            }
        }
    }

    /**
     * Считает количество соседей вокруг клекти
     * @param {{row: number, col: number, alive: boolean}} cell - Клетка
     * @returns {number} Количество соседей
     */
    isNeighborAlive(row, col) {
        if (!this.cells[row] || !this.cells[col]) return false;

        let cell = this.cells[row][col];

        return cell && cell.isAlive;
    }

    /**
     * Считает количество соседей вокруг клекти
     * @param {{row: number, col: number, alive: boolean}} cell - Клетка
     * @returns {number} Количество соседей
     */
    countNeighbors(cell) {
        let count = 0;
        let { row, col } = cell;

        if (this.isNeighborAlive(row - 1, col - 1)) count += 1; // ↖️
        if (this.isNeighborAlive(row - 1, col)) count += 1;     // ⬆️
        if (this.isNeighborAlive(row - 1, col + 1)) count += 1; // ↗️
        if (this.isNeighborAlive(row, col + 1)) count += 1;     // ➡️
        if (this.isNeighborAlive(row + 1, col + 1)) count += 1; // ↘️
        if (this.isNeighborAlive(row + 1, col)) count += 1;     // ⬇️
        if (this.isNeighborAlive(row + 1, col - 1)) count += 1; // ↙️
        if (this.isNeighborAlive(row, col - 1)) count += 1;     // ⬅️

        return count;
    }
    
    /**
     * Высчитывает новую сетку с новым поколением клеток согласно правилам игры
     * @returns {[[{row: number, col: number, alive: boolean}]]} Новая сетка
     */
    compute() {
        let nextGrid = new Grid(this.size);

        for (let r = 0; r < nextGrid.size; r++) {
            for (let c = 0; c < nextGrid.size; c++) {
                let cell = this.cells[r][c];
                let nextCell = nextGrid.cells[r][c];
                let numNeighbors = this.countNeighbors(cell);
                
                if (cell.isAlive) {
                    if (numNeighbors < 2) { // cell dies
                        nextCell.die();
                    } else if (numNeighbors === 2 || numNeighbors === 3) { // cell lives
                        nextCell.live();
                    } else if (numNeighbors > 3) { // cell dies
                        nextCell.die();
                    }
                } else {
                    if (numNeighbors === 3) {
                        nextCell.live(); // cell becomes alive
                    }
                }
            }
        }

        this.cells = nextGrid.cells;

        return this;
    }

    /**
     * Формирует строковое представление сетки
     * @returns {string} Строковое представление сетки
     */
    render() {
        let output = '';

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cell = this.cells[i][j];

                if (cell.isAlive) {
                    output += ' ⚪ ';
                } else {
                    output += '   ';
                }

                if (cell.col === this.size - 1) {
                    output += '\r\n';
                }
            }
        }

        return output;
    }
}

module.exports = Grid;