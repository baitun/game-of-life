export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.game.onStateChange = this.handleGameStateChange.bind(this);

        this.view.onGridClick = this.handleGridClick.bind(this);
        this.view.onPlayButtonClick = this.handlePlayButtonClick.bind(this);
        this.view.onResetButtonClick = this.handleResetButtonClick.bind(this);
        this.view.onRandomizeButtonClick = this.handleRandomizeButtonClick.bind(this);
        this.view.onSpeedSliderChange = this.handleSpeedSliderChange.bind(this);
        
        this.view.init();
    }

    handleGridClick(row, col) {
        this.game.toggleCellState(row, col);
    }

    handleGameStateChange(grid) {
        this.view.updateGrid(grid);
    }
    
    handlePlayButtonClick() {
        this.game.toggle();
        this.view.updateControls(this.game.isPlaying);
    }
    
    handleResetButtonClick() {
        this.game.reset();
        this.view.resetControls();
    }
    
    handleRandomizeButtonClick() {
        this.game.randomize();
    }
    
    handleSpeedSliderChange(value) {
        this.game.changeSpeed(value);
    }
}