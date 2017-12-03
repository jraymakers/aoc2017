const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const input = parseInt(data, 10);

function makeGrid(max) {
  // Array<{ x: number, y: number }>
  const grid = [];

  let ringEdge = 0;
  let ringMin = 1;
  let ringMax = 1;
  let x = 0;
  let y = 0;
  let n = 0;
  while (n <= max) {
    grid[n] = { x, y };
    n += 1;
    if (n > ringMax) {
      ringEdge += 2;
      ringMin = n;
      ringMax += 4 * ringEdge;
      x += 1;
    } else {
      switch (Math.floor((n - ringMin) / ringEdge)) {
        case 0:
          y += 1;
          break;
        case 1:
          x -= 1;
          break;
        case 2:
          y -=1;
          break;
        case 3:
          x += 1;
          break;
      }
    }
  }
  return grid;
}

function coordOf(n) {
  const grid = makeGrid(n);
  return grid[n];
}

function dist(n) {
  const coord = coordOf(n);
  return Math.abs(coord.x) + Math.abs(coord.y);
}

console.log(dist(input));
