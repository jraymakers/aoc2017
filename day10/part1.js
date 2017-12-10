const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const parts = data.split(',');
const lengths = parts.map((part) => parseInt(part, 10));

// const max = 4;
const max = 255;

let list = [];
for (let i = 0; i <= max; i++) {
  list.push(i);
}
let currentPosition = 0;
let skipSize = 0;

function reverse(a, start, len) {
  let last = start + len - 1;
  while (start < last) {
    const temp = a[start % a.length];
    a[start % a.length] = a[last % a.length];
    a[last % a.length] = temp;
    start += 1;
    last -= 1;
  }
}

console.log(list.join(','));
for (const length of lengths) {
  reverse(list, currentPosition, length);
  console.log(list.join(','));
  currentPosition += (length + skipSize) % list.length;
  skipSize += 1;
}

console.log(list[0] * list[1]);
