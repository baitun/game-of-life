const GRID_WIDTH = 1200,
  GRID_HEIGHT = 650,
  GRID_ROWS = 32,
  GRID_COLS = 64;
let gameSpeed = 1000;

const grid = createGrid(GRID_ROWS, GRID_COLS);
const nextGrid = createGrid(GRID_ROWS, GRID_COLS);

let isPlaing = false;
let interval = null;

const root = document.getElementById("root");

const table = createTable(GRID_ROWS, GRID_COLS);
createControls();

function play() {
  computeNextGrid();
  updateView();
}

function updateView() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = table.rows[i].cells[j];
      const isCellAlive = grid[i][j];
      cell.classList.toggle("alive", isCellAlive);
    }
  }
}

function createTable(rows, cols) {
  const table = document.createElement("table");

  table.className = "grid";

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    row.className = "row";
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.className = "cell";
      cell.width = GRID_WIDTH / cols;
      cell.height = GRID_HEIGHT / rows;

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  table.addEventListener("click", event => {
    if (!event.target.classList.contains("cell")) return;
    const cell = event.target;
    const colIndex = cell.cellIndex;
    const rowIndex = cell.parentNode.rowIndex;
    const isCellAlive = (grid[rowIndex][colIndex] = !grid[rowIndex][colIndex]);
    cell.classList.toggle("alive", isCellAlive);
  });

  root.appendChild(table);

  return table;
}

function createControls() {
  const startButton = document.createElement("button");
  startButton.className = "material-icons";
  startButton.textContent = "play_arrow";
  startButton.addEventListener("click", function() {
    if (isPlaing) {
      isPlaing = false;
      this.textContent = "play_arrow";
      clearInterval(interval);
    } else {
      isPlaing = true;
      this.textContent = "pause";
      clearInterval(interval);
      interval = setInterval(play, gameSpeed);
      play();
    }
  });

  const resetButton = document.createElement("button");
  resetButton.className = "material-icons";
  resetButton.textContent = "replay";
  resetButton.addEventListener("click", function() {
    isPlaing = false;
    startButton.textContent = "play_arrow";
    clearInterval(interval);
    resetGrid();
    updateView();
  });

  const randomizeButton = document.createElement("button");
  randomizeButton.className = "material-icons";
  randomizeButton.textContent = "transform";
  randomizeButton.addEventListener("click", function() {
    isPlaing = false;
    startButton.textContent = "play_arrow";
    clearInterval(interval);
    randomizeGrid();
    updateView();
  });

  const speedSlider = document.createElement("input");
  speedSlider.type = "range";
  speedSlider.min = 100;
  speedSlider.max = 1000;
  speedSlider.step = 100;
  speedSlider.value = gameSpeed;
  speedSlider.addEventListener("input", function() {
    gameSpeed = this.value;
    if (isPlaing) {
      clearInterval(interval);
      interval = setInterval(play, gameSpeed);
    }
  });

  const container = document.createElement("div");
  container.className = "controls";
  container.append(startButton, resetButton, randomizeButton, speedSlider);
  root.appendChild(container);
}

function createGrid(rows, cols) {
  return new Array(rows).fill(false).map(() => new Array(cols).fill(false));
}

function randomizeGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = Math.random() > 0.5;
    }
  }
}

function resetGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = false;
    }
  }
}

function computeNextGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      applyRules(i, j);
    }
  }

  copyNextGrid();
}

function copyNextGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = nextGrid[i][j];
      nextGrid[i][j] = false;
    }
  }
}

function applyRules(i, j) {
  const isCellAlive = grid[i][j];
  const numberOfNeighbors = countNeighbors(i, j);

  if (isCellAlive) {
    if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
      nextGrid[i][j] = false;
    } else {
      nextGrid[i][j] = true;
    }
  } else {
    if (numberOfNeighbors == 3) {
      nextGrid[i][j] = true;
    }
  }
}

function countNeighbors(i, j) {
  let count = 0;
  if (i - 1 >= 0) {
    count += grid[i - 1][j];
    if (j - 1 >= 0) {
      count += grid[i - 1][j - 1];
    }
    if (j + 1 < GRID_COLS) {
      count += grid[i - 1][j + 1];
    }
  }
  if (j - 1 >= 0) {
    count += grid[i][j - 1];
  }
  if (i + 1 < GRID_ROWS) {
    count += grid[i + 1][j];
    if (j - 1 >= 0) {
      count += grid[i + 1][j - 1];
    }
    if (j + 1 < GRID_COLS) {
      count += grid[i + 1][j + 1];
    }
  }
  if (j + 1 < GRID_ROWS) {
    count += grid[i][j + 1];
  }
  return count;
}
