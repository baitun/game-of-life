export default class GridView {
    constructor(rows, cols, width, height) {
        this._table = null;
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.cols = cols;
        this.cellWidth = Math.round(width / rows);
        this.cellHeight = Math.round(height / cols);
        this.onClick = Function.prototype;
        this._createTable();
    }
    get element() {
        return this._table;
    }
    _init() { }
    _createTable() {
        const table = document.createElement("table");
        for (let i = 0; i < this.rows; i++) {
            const tr = document.createElement("tr");
            tr.className = "row";
            for (let j = 0; j < this.cols; j++) {
                const td = document.createElement("td");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        table.addEventListener("click", event => {
            // if(!event.target.classList)
        });
        this._table = table;
    }
}
