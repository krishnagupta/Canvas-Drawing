const args = process.argv.slice(2)
console.log(args[0])

const initializeMatrix = (width, height) => {
    // 2 is added in both width and height to include border of canvas
    const widhIncludingBorder = width + 2;
    const heightIncludingBorder = height + 2;
    return new Array(widhIncludingBorder)
      .fill()
      .map(() => new Array(heightIncludingBorder).fill());
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
  console.log(createLine([1,2,2,2], initializeMatrix(3,3)))