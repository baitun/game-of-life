class Button {
    constructor(type, onClick) {
        this.onClick = onClick.bind(this);
        this._handleClick = this._handleClick.bind(this);
        const button = document.createElement("button");
        button.className = "material-icons";
        switch (type) {
            case "start":
                button.textContent = "play_arrow";
                break;
            case "reset":
                button.textContent = "replay";
                break;
            case "randomize":
                button.textContent = "transform";
                break;
        }
        button.addEventListener("click", this._handleClick);
        this.element = button;
    }
    _handleClick() {
        this.onClick();
    }
}
class StartButton extends Button {
    constructor(onClick) {
        super("start", onClick);
        this.element.textContent = "play_arrow";
    }
    showPlay() {
        this.element.textContent = "play_arrow";
    }
    showPause() {
        this.element.textContent = "pause";
    }
}
export { Button, StartButton };
