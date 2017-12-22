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
      map[`${c}_${r}`] = true;
    }
  }
}

// console.log(`${x} ${y} ${d}`);
// console.log(map);

let burstsThatInfect = 0;
for (let i = 0; i < 10000; i++) {
  const key = `${x}_${y}`;
  if (map[key]) {
    d = (d + 1) % 4;
  } else {
    d = (d - 1) % 4;
  }
  if (d < 0) d += 4;
  map[key] = !map[key];
  if (map[key]) {
    burstsThatInfect++;
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
