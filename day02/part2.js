const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const rows = lines.map(
  (line) => line.split('\t').map((numStr) => parseInt(numStr, 10))
);

function rowNum(row) {
  for (let i = 0; i < row.length; i++) {
    for (let j = i+1; j < row.length; j++) {
      const numi = row[i];
      const numj = row[j];
      if (numi % numj === 0) {
        return numi / numj;
      }
      if (numj % numi === 0) {
        return numj / numi;
      }
    }
  }
  return 0;
}

let sum = 0;
for (const row of rows) {
  sum += rowNum(row);
}

console.log(sum);
