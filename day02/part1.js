const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const rows = lines.map(
  (line) => line.split('\t').map((numStr) => parseInt(numStr, 10))
);

function rowNum(row) {
  const min = Math.min(...row);
  const max = Math.max(...row);
  return max - min;
}

let sum = 0;
for (const row of rows) {
  sum += rowNum(row);
}

console.log(sum);
