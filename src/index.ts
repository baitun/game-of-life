import Game from "./Game.js";
import View from "./View.js";
import GridView from "./GridView.js";
import Controller from "./Controller.js";

const GRID_WIDTH = 1000,
  GRID_HEIGHT = 650,
  GRID_ROWS = 32,
  GRID_COLS = 64;

const root = document.getElementById("root");
const game = new Game(GRID_ROWS, GRID_COLS);
const gridView = new GridView(GRID_ROWS, GRID_COLS, GRID_WIDTH, GRID_HEIGHT);
const view = new View(root, gridView);
const controller = new Controller(game, view);
console.log(controller);
