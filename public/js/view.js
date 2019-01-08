class View {
    constructor(element, size) {
        this.element = element;
        this.size = size;

        this.init();
    }

    init() {
        this.table = this.cteateTable(this.size);

        this.grid = this.element.querySelector('#grid');
        this.grid.appendChild(this.table);
        this.grid.addEventListener('click', this.handleCellClick.bind(this));

        this.playButton = this.element.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));

        this.resetButton = this.element.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));

        this.randomizeButton = this.element.querySelector('#randomize-button');
        this.randomizeButton.addEventListener('click', this.handleRandomizeButtonClick.bind(this));

        this.speedSlider = this.element.querySelector('#speed-slider');
        this.speedSlider.addEventListener('input', this.handleSpeedSliderChange.bind(this));
    }

    cteateTable(size) {
        const table = document.createElement('table');

        for (let r = 0; r < size; r++) {
            const row = document.createElement('tr');

            for (let c = 0; c < size; c++) {
                const cell = document.createElement('td');
                
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        return table;
    }

    handleCellClick(event) {
        const cellIndex = event.target.cellIndex;
        const rowIndex = event.target.parentNode.rowIndex;

        this.onCellClick(rowIndex, cellIndex);
    }

    handlePlayButtonClick() {
        this.onPlay();
    }

    handleResetButtonClick() {
        this.onReset();
    }

    handleRandomizeButtonClick() {
        this.onRandomize();
    }

    handleSpeedSliderChange(event) {
        let value = Number(event.target.value);
        
        this.onChangeSpeed(value);
    }

    play() {
        this.playButton.textContent = 'pause';
    }

    pause() {
        this.playButton.textContent = 'play_arrow';
    }

    reset() {
        this.speedSlider.value = 0;
        this.playButton.textContent = 'play_arrow';
    }

    render(cells) {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let cell = this.table.rows[r].cells[c];
                let isAlive = cells[r][c];
                
                if (isAlive) {
                    cell.className = 'alive';
                } else {
                    cell.className = '';
                }
            }
        }
    }
}