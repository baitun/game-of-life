import * as dom from '../lib/dom.js';

export default class View {
    constructor(root, gridView) {
        this.root = root;
        this.gridView = gridView;
        this.headerElement = null;
        this.controlsElement = null;
        this.controls = {};

        this.onGridClick = Function.prototype;
        this.onPlayButtonClick = Function.prototype;
        this.onResetButtonClick = Function.prototype;
        this.onRandomizeButtonClick = Function.prototype;
        this.onSpeedSliderChange = Function.prototype;

        this._createControls();
    }

    init() {
        this._bindEvents();
        this._render();
    }

    updateGrid(grid) {
        this.gridView.update(grid);
    }

    resetGrid() {
        this.gridView.reset();
    }

    updateControls(isPlaying) {
        if (isPlaying) {
            this.controls.playButton.textContent = 'pause';
            this.controls.playButton.title = 'Остановить игру';
            this.controls.randomizeButton.disabled = true;
            this.controls.speedSlider.disabled = false;
        } else {
            this.controls.playButton.textContent = 'play_arrow';
            this.controls.playButton.title = 'Запустить игру';
            this.controls.randomizeButton.disabled = false;
            this.controls.speedSlider.disabled = true;
        }
    }

    resetControls() {
        this.controls.speedSlider.value = 0;
        this.controls.playButton.textContent = 'play_arrow';
        this.controls.speedSlider.disabled = true;
    }

    _createControls() {
        const playButton = dom.createElement('button', {
            id: 'play-button',
            className: 'material-icons',
            title: 'Запустить игру',
            onclick: () => this.onPlayButtonClick()
        }, 'play_arrow');

        const resetButton = dom.createElement('button', {
            id: 'reset-button',
            className: 'material-icons',
            title: 'Перезапустить игру',
            onclick: () => this.onResetButtonClick()
        }, 'replay');

        const randomizeButton = dom.createElement('button', {
            id: 'randomize-button',
            className: 'material-icons',
            onclick: () => this.onRandomizeButtonClick()
        }, 'transform');

        const speedSlider = dom.createElement('input', {
            id: 'speed-slider',
            type: 'range',
            min: 0,
            max: 900,
            step: 100,
            value: 0,
            disabled: true,
            oninput: event => this.onSpeedSliderChange(Number(event.target.value))
        });

        this.controls = { playButton, resetButton, randomizeButton, speedSlider };

        this.controlsElement = dom.createElement('div', { className: 'controls' },
            playButton,
            resetButton,
            randomizeButton,
            speedSlider
        );
    }

    _bindEvents() {
        this.gridView.onClick = (...args) => this.onGridClick(...args);
    }

    _render() {
        this.root.appendChild(this.gridView.element);
        this.root.appendChild(this.controlsElement);
    }
}