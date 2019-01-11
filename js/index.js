import Game from './src/game.js';
import TableGridView from './src/table-grid-view.js';
import CanvasGridView from './src/canvas-grid-view.js';
import View from './src/view.js';
import Controller from './src/controller.js';

const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;

const root = document.querySelector('#root');

const game = new Game(GRID_ROWS, GRID_COLS);
const tableGridView = new TableGridView(GRID_WIDTH, GRID_HEIGHT, GRID_ROWS, GRID_COLS);
const canvasGridView = new CanvasGridView(GRID_WIDTH, GRID_HEIGHT, GRID_ROWS, GRID_COLS);
const view = new View(root, tableGridView);
const controller = new Controller(game, view);