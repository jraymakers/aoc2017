const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lengths = data.split('').map((c) => c.charCodeAt(0));
lengths.push(17, 31, 73, 47, 23);

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

for (let i = 0; i < 64; i++) {
  for (const length of lengths) {
    reverse(list, currentPosition, length);
    currentPosition += (length + skipSize) % list.length;
    skipSize += 1;
  }
}

const dense = [];
for (let i = 0; i < 16; i++) {
  let value = list[i*16];
  for (let j = 1; j < 16; j++) {
    value ^= list[i*16+j];
  }
  dense.push(value);
}

console.log(dense.map((d) => d.toString(16)).join(''));
