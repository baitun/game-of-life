class Game {
    constructor({ element, grid }) {
        this.element = element;
        this.grid = grid;
        this.playButton = null;

        this.speed = 0;
        this.isPlaying = false;
        this.interval = null;

        this.init();
    }

    init() {
        this.playButton = this.element.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));

        this.resetButton = this.element.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));

        this.randomizeButton = this.element.querySelector('#randomize-button');
        this.randomizeButton.addEventListener('click', this.handleRandomizeButtonClick.bind(this));

        this.speedSlider = this.element.querySelector('#speed-slider');
        this.speedSlider.addEventListener('input', this.handleSpeedSliderChange.bind(this));
    }

    play() {
        this.isPlaying = true;
        this.playButton.textContent = 'pause';
        this.grid.next();
    }

    pause() {
        this.isPlaying = false;
        this.playButton.textContent = 'play_arrow';
        clearInterval(this.interval);
    }

    reset() {
        this.isPlaying = false;
        this.playButton.textContent = 'play_arrow';
        this.grid.reset();
        this.speedSlider.value = 0;
        this.speed = 0;
        clearInterval(this.interval);
    }

    randomize() {
        if (this.isPlaying) return;

        this.reset();
        this.grid.randomize();
    }

    handlePlayButtonClick() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
            this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
        }
    }

    handleResetButtonClick() {
        this.reset();
    }

    handleRandomizeButtonClick() {
        this.randomize();
    }

    handleSpeedSliderChange(event) {
        let value = Number(event.target.value);
        this.speed = value;

        clearInterval(this.interval);
        this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
    }
}