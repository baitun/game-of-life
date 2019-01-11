import * as dom from '../lib/dom.js';
import GridView from './grid-view.js';

export default class TableGridView extends GridView {
    constructor(width, height, rows, cols) {
        super(width, height, rows, cols);

        this.table = null;

        this._createTable();
        this._handleEvents();
    }

    get element() {
        return this.table;
    }

    update(grid) {
        this._forEachCell((cell, rowIndex, cellIndex) => {
            this._updateCell(cell, grid[rowIndex][cellIndex].alive)
        });
    }

    reset() {
        this._forEachCell(cell => {
            this._resetCell(cell);
        });
    }

    _createTable() {
        const table = dom.createElement('table', { className: 'grid' });

        for (let i = 0; i < this.rows; i++) {
            const row = dom.createElement('tr', { className: 'row' });
            
            for (let j = 0; j < this.cols; j++) {
                const cell = dom.createElement('td', { className: 'cell', width: this.cellWidth, height: this.cellHeight });
                
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        this.table = table;
    }

    _handleEvents() {
        this.table.addEventListener('click', event => {
            const rowIndex = event.target.parentNode.rowIndex;
            const cellIndex = event.target.cellIndex;

            this.onClick(rowIndex, cellIndex)
        });
    }

    _updateCell(cell, isAlive) {
        cell.classList.toggle('alive', isAlive);
    }

    _resetCell(cell) {
        cell.classList.remove('alive');
    }

    _getCell(rowIndex, colIndex) {
        return this.table.rows[rowIndex].cells[colIndex];
    }

    _forEachCell(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                fn(this._getCell(i, j), i, j);
            }
        }
    }
}