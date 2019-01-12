interface IClickable {
  onClick: Function;
}

class Button implements IClickable {
  public element: HTMLElement;
  public onClick: Function;
  constructor(type: "start" | "reset" | "randomize", onClick: Function) {
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

  private _handleClick() {
    this.onClick();
  }
}

class StartButton extends Button {
  constructor(onClick: Function) {
    super("start", onClick);
    this.element.textContent = "play_arrow";
  }
  public showPlay() {
    this.element.textContent = "play_arrow";
  }
  public showPause() {
    this.element.textContent = "pause";
  }
}

export { Button, StartButton };
