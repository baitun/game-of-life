class Game {
    constructor(element, size) {
        this.element = element;
        this.size = size;

        this.grid = new Grid(element.querySelector('#grid'), size);
        this.isPlaying = false;
        this.speed = 0;
        this.interval = null;

        this.init();
    }

    init() {
        this.playButton = this.element.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));

        this.resetButton = this.element.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));

        this.randomizeButton = this.element.querySelector('#randomize-button');
        this.randomizeButton.addEventListener('click', this.handleRandmizeButtonClick.bind(this));

        this.speedSlider = this.element.querySelector('#speed-slider');
        this.speedSlider.addEventListener('input', this.handleSpeedSliderChange.bind(this));

        this.next = this.next.bind(this);
    }

    handlePlayButtonClick() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    handleResetButtonClick() {
        this.reset();
    }

    handleRandmizeButtonClick() {
        this.randomize();
    }

    handleSpeedSliderChange(event) {
        let value = Number(event.target.value);
        
        this.changeSpeed(value);
    }

    next() {
        this.grid.next();
    }

    play() {
        this.isPlaying = true;
        this.playButton.textContent = 'pause';
        this.interval = setInterval(this.next, 1000 - this.speed);   
    }

    pause() {
        this.isPlaying = false;
        this.playButton.textContent = 'play_arrow';
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.speed = 0;
        this.speedSlider.value = 0;
        this.grid.reset();
    }

    randomize() {
        if (this.isPlaying) return;

        this.reset();
        this.grid.randomize();
    }

    changeSpeed(value) {
        if (!this.isPlaying) return;
        
        this.speed = value;
        clearInterval(this.interval);
        this.interval = setInterval(this.next, 1000 - this.speed);
    }
}