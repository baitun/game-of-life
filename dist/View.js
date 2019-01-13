// import { createElement } from "./lib/dom.js";
import { Button, StartButton } from "./Buttons.js";
export default class View {
    constructor(rootElement, gridView) {
        this.controlsElement = null;
        this.rootElement = rootElement;
        this.gridView = gridView;
    }
    _init() {
        this._createControls();
        this._render();
    }
    _createControls() {
        const startButton = new StartButton(() => {
            if (this.isPlaing) {
                this.pause();
                startButton.showPlay();
            }
            else {
                this.play();
                startButton.showPause();
            }
        });
        const resetButton = new Button("reset", () => {
            this.reset();
            startButton.showPlay();
        });
        const randomizeButton = new Button("randomize", () => {
            this.randomize();
        });
        const speedSlider = document.createElement("input");
        speedSlider.type = "range";
        speedSlider.min = "0";
        speedSlider.max = "900";
        speedSlider.step = "100";
        speedSlider.value = String(1000 - this.speed);
        speedSlider.addEventListener("input", () => {
            this.changeSpeed(Number(speedSlider.value));
        });
        const container = document.createElement("div");
        container.className = "controls";
        container.append(startButton.element, resetButton.element, randomizeButton.element, speedSlider);
        this.controlsElement = container;
    }
    _render() {
        if (this.rootElement)
            this.rootElement.appendChild(this.gridView);
    }
}
