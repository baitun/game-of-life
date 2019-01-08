const GRID_SIZE = 36;

const model = new Model(GRID_SIZE);
const view = new View(document.querySelector('#game'), GRID_SIZE);

new Controller(model, view);