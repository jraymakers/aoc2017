const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const jumps = lines.map((line) => parseInt(line, 10));

let steps = 0;
let current = 0;
while (current < jumps.length) {
  const offset = jumps[current];
  jumps[current] += 1;
  current += offset;
  steps += 1;
}

console.log(steps);
