class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.speed = 0;
        this.isPlaying = false;
        this.interval = null;

        this.init();
    }

    init() {
        this.view.onCellClick = this.handleCellClick.bind(this);
        this.view.onPlay = this.toggle.bind(this);
        this.view.onPause = this.pause.bind(this);
        this.view.onReset = this.reset.bind(this);
        this.view.onChangeSpeed = this.changeSpeed.bind(this);
        this.view.onRandomize = this.randomize.bind(this);

        this.next = this.model.next.bind(this.model);
        this.model.onChange = this.view.render.bind(view);
    }

    handleCellClick(rowIndex, cellIndex) {
        this.model.toggleCellState(rowIndex, cellIndex);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.view.play();
        this.interval = setInterval(this.next, 1000 - this.speed);
    }

    pause() {
        this.isPlaying = false;
        this.view.pause();
        clearInterval(this.interval);
    }

    reset() {
        this.isPlaying = false;
        this.speed = 0;
        clearInterval(this.interval);
        
        this.view.reset();
        this.model.reset();
    }

    changeSpeed(value) {
        this.speed = value;

        clearInterval(this.interval);
        this.interval = setInterval(this.next, 1000 - this.speed);
    }

    randomize() {
        if (this.isPlaying) return;

        this.reset();
        this.model.randomize();
    }
}