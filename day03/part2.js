const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const input = parseInt(data, 10);

function valueOf(x, y, values) {
  let value = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx !== 0 || dy !== 0) {
        const adjValue = values[`${x+dx}_${y+dy}`];
        if (adjValue > 0) {
          value += adjValue;
        }
      }
    }
  }
  return value > 0 ? value : 1;
}

function calcFirstNewValueLargerThanMax(maxN, maxValue) {
  const coords = []; // Array<{ x: number, y: number }>
  const values = {}; // Map<string, number>; string = `${x}_${y}`

  let ringEdge = 0;
  let ringMin = 1;
  let ringMax = 1;
  let x = 0;
  let y = 0;
  let n = 0;
  while (n <= maxN) {
    coords[n] = { x, y };
    const newValue = valueOf(x, y, values);
    if (newValue > maxValue) {
      return newValue;
    }
    values[`${x}_${y}`] = newValue;
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
}

console.log(calcFirstNewValueLargerThanMax(input, input));
