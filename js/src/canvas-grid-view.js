import * as dom from '../lib/dom.js';
import GridView from './grid-view.js';

export default class CanvasGridView extends GridView {
    constructor(width, height, rows, cols) {
        super(width, height, rows, cols);
        
        this.canvas = null;
        this.context = null;

        this._createCanvas();
        this._handleEvents();
        this._drawGrid();
    }

    get element() {
        return this.canvas;
    }

    update(grid) {
        this._clearGrid();
        this._drawGrid();
        this._drawCells(grid);
    }

    reset() {
        this._clearGrid();
        this._drawGrid();
    }

    _createCanvas() {
        const canvas = dom.createElement('canvas', {
            className: 'grid',
            width: this.gridWidth,
            height: this.gridHeight
        });

        this.context = canvas.getContext('2d');
        this.canvas = canvas;
    }

    _handleEvents() {
        this.canvas.addEventListener('click', event => {
            const { offsetX, offsetY } = event;

            this._getCellPositionFromCoords(offsetX, offsetY);
        });
    }
    
    _getCellPositionFromCoords(x, y) {
        const rowIndex = Math.floor(y / this.cellHeight);
        const cellIndex = Math.floor(x / this.cellWidth);
        
        this.onClick(rowIndex, cellIndex);
    }

    _clearGrid() {
        this.context.clearRect(0, 0, this.gridWidth, this.gridHeight);
    }

    _drawGrid() {
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#444';
        const startX = 0.5;
        const startY = 0.5;
        const endX = this.gridWidth - 0.5;
        const endY = this.gridHeight - 0.5;

        this._drawLine(startX, startY, endX, startY);
        this._drawLine(endX, startY, endX, endY);
        this._drawLine(endX, endY, startY, endY);
        this._drawLine(startX, endY, startX, startY);
        
        for (let i = 1; i < this.rows; i++) {
            const rowY = i * this.cellHeight + 0.5;

            this._drawLine(startX, rowY, endX, rowY);

            for (let j = 1; j < this.cols; j++) {
                const colX = j * this.cellWidth + 0.5;
                
                this._drawLine(colX, startY, colX, endY);
            }
        }
    }

    _drawCells(grid) {
        this.context.fillStyle = '#00FF00';

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = grid[i][j];

                if (cell.alive) {
                    const cellX = j * this.cellWidth;
                    const cellY = i * this.cellHeight;

                    this._drawCell(cellX, cellY);
                }
            }
        }
    }

    _drawCell(x, y) {
        this.context.fillRect(x + 1, y + 1, this.cellWidth - 1, this.cellHeight - 1);
    }

    _drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
}