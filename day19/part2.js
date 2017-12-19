const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

let row = 0;
let col = lines[0].indexOf('|');
let drow = 1;
let dcol = 0;

function getCharAt(r, c) {
  if (r < 0 || r >= lines.length) {
    return null;
  }
  const line = lines[r];
  if (c < 0 || c >= line.length) {
    return null;
  }
  const char = line[c];
  return char;
}

const chars = [];
let steps = 1;
while (true) {
  row += drow;
  col += dcol;
  const char = getCharAt(row, col);
  if (char === null || char === ' ') break;
  steps++;
  // console.log(char);
  if (/[A-Z]/.test(char)) {
    chars.push(char);
  } else if (char === '+') {
    if (dcol !== 0) {
      const up = getCharAt(row-1, col);
      const down = getCharAt(row+1, col);
      if (up !== null && /[A-Z|+]/.test(up)) {
        drow = -1;
      } else if (down !== null && /[A-Z|+]/.test(down)) {
        drow = 1;
      } else {
        break;
      }
      dcol = 0;
    } else {
      const left = getCharAt(row, col-1);
      const right = getCharAt(row, col+1);
      if (left !== null && /[A-Z-+]/.test(left)) {
        dcol = -1;
      } else if (right !== null && /[A-Z-+]/.test(right)) {
        dcol = 1;
      } else {
        break;
      }
      drow = 0;
    }
  }
}

console.log(chars.join(''));
console.log(steps);
