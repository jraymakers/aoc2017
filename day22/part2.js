const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

let w = lines[0].length;
let h = lines.length;

let x = Math.floor(w / 2);
let y = Math.floor(h / 2);
let d = 0; // 0 = n, 1 = e, 2 = s, 3 = w (right = +1, left = -1)

const map = {};
for (let r = 0; r < h; r++) {
  const line = lines[r];
  for (let c = 0; c < w; c++) {
    const ch = line[c];
    if (ch === '#') {
      map[`${c}_${r}`] = 'I';
    }
  }
}

// console.log(`${x} ${y} ${d}`);
// console.log(map);

let burstsThatInfect = 0;
for (let i = 0; i < 10000000; i++) {
  const key = `${x}_${y}`;
  switch (map[key]) {
    case 'W':
      map[key] = 'I';
      burstsThatInfect++;
      break;
    case 'I':
      d = (d + 1) % 4; // right
      map[key] = 'F';
      break;
    case 'F':
      d = (d + 2) % 4; // reverse
      map[key] = 'C';
      break;
    case 'C':
    default:
      d = (d + 3) % 4; // left
      map[key] = 'W';
      break;
  }
  switch (d) {
    case 0:
      y--;
      break;
    case 1:
      x++;
      break;
    case 2:
      y++;
      break;
    case 3:
      x--;
      break;
  }
  // console.log(`${x} ${y} ${d}`);
  // console.log(map);
}

console.log(burstsThatInfect);
