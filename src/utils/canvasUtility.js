import { initializeMatrix } from "../utils/utility";
import { validOperation } from "../constant/constant";

const createCanvas = (command) => {
  const width = +command[1];
  const height = +command[2];
  const initMatrix = initializeMatrix(width, height);
  return initMatrix;
};

const createLine = (rest, matrix) => {
  const [x1, y1, x2, y2] = rest;
  let grid = [...matrix];
  if (x1 === x2) {
    // Write line into grid
    for (let y = y1; y <= y2; y++) {
      grid[y][x1] = "x";
    }
  } else if (y1 === y2) {
    // Write line into grid
    for (let x = x1; x <= x2; x++) {
      grid[y1][x] = "x";
    }
  }
  return grid;
};

const createRectangle = (rest, matrix) => {
  const [x1, y1, x2, y2] = rest;
  const grid = [...matrix];
  if (x1 !== x2 && y1 !== y2) {
    let minX = Math.min(x1, x2);
    let minY = Math.min(y1, y2);
    let maxX = Math.max(x1, x2);
    let maxY = Math.max(y1, y2);
    for (let i = minX; i <= maxX; i++) {
      grid[minY][i] = "x";
    }
    for (let i = minX; i <= maxX; i++) {
      grid[maxY][i] = "x";
    }
    for (let i = minY; i <= maxY; i++) {
      grid[i][minX] = "x";
    }
    for (let i = minY; i <= maxY; i++) {
      grid[i][maxX] = "x";
    }
  }
  return grid;
};

const fillCanvas = (grid, x,y , newColor) => {
  let currentVal = grid[x][y];
  // set currentVal to newColor
  grid[x][y] = newColor;

  // check top, bottom, left and right
  // if they match currentVal, call function with that val's coordinates
  // top
  if (x - 1 >= 0 && grid[x - 1][y] === currentVal) {
    fillCanvas(grid, x - 1, y, newColor);
  }
  // bottom
  if (x + 1 < grid.length && grid[x + 1][y] === currentVal) {
    fillCanvas(grid, x + 1, y, newColor);
  }
  // left
  if (y - 1 >= 0 && grid[x][y - 1] === currentVal) {
    fillCanvas(grid, x, y - 1, newColor);
  }
  // right
  if (y + 1 < grid[x].length && grid[x][y + 1] === currentVal) {
    fillCanvas(grid, x, y + 1, newColor);
  }
  return grid;
};

const commandOperation = (command, matrix, setMatrix) => {
  const [firstCommand, ...rest] = command;
  let grid;
  if (firstCommand === validOperation.CREATE_CANVAS) {
    grid = createCanvas(command);
  } else if (firstCommand === validOperation.CREATE_LINE) {
    grid = createLine(rest, matrix);
  } else if (firstCommand === validOperation.CREATE_RECTANGLE) {
    grid = createRectangle(rest, matrix);
  } else if (firstCommand === validOperation.FILL_COMMAND) {
    const [x, y, newColor] = rest;
    const copyMatrix = [...matrix];
    const fillSymbol = newColor[0];
    grid = fillCanvas(copyMatrix, x, y, fillSymbol);
  } else if (firstCommand === validOperation.QUIT_COMMAND) {
    grid = []
  }
  setMatrix(grid)
};

const getCanvasWidth = (matrix) => {
    return matrix?.length
  }
  
  const getCanvasHeight = (matrix) => {
    return  matrix && matrix[0]?.length
  }

export {
  createCanvas,
  createLine,
  createRectangle,
  fillCanvas,
  commandOperation,
  getCanvasWidth,
  getCanvasHeight,
};
