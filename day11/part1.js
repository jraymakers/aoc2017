const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const dirs = data.split(',');

const distances = {};
let q = 0;
let r = 0;
for (const dir of dirs) {
  switch (dir) {
    case 'n':
      q += 1;
      break;
    case 's':
      q -= 1;
      break;
    case 'ne':
      r += 1;
      break;
    case 'sw':
      r -= 1;
      break;
    case 'nw':
      q += 1;
      r -= 1
      break;
    case 'se':
      q -= 1;
      r += 1;
      break;
  }
}

function dist(q,r) {
  if ( (q >= 0 && r >= 0) || (q <= 0 && r <= 0)) {
    return Math.abs(q) + Math.abs(r);
  } else {
    return Math.max(Math.abs(q), Math.abs(r));
  }
}

console.log(dist(q,r));
