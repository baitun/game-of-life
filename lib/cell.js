class Cell {
    /**
     * Создает объект клетки
     * @param {number} row - Индекс ряда
     * @param {number} col - Индекс колонки
     * @param {boolean} [alive=false] - Живая ли клетка
     * @returns {{row: number, col: number, alive: boolean}} Объект клетки со свойствами row, col и alive
     */
    constructor(row, col, alive = false) {
        this._row = row;
        this._col = col;
        this._alive = alive;
    }

    get isAlive() {
        return this._alive;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    die() {
        this._alive = false;
    }

    live() {
        this._alive = true;
    }
}

module.exports = Cell;