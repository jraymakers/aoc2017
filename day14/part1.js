// const input = 'flqrgnkx'; // example;
const input = 'ljoxqyyw';

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

function knotHash(data) {
  const lengths = data.split('').map((c) => c.charCodeAt(0));
  lengths.push(17, 31, 73, 47, 23);
  
  const max = 255;
  
  let list = [];
  for (let i = 0; i <= max; i++) {
    list.push(i);
  }
  let currentPosition = 0;
  let skipSize = 0;
  
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
  
  return dense.map((d) => d.toString(16)).join('');
}

function bitsOnHexDigit(d) {
  switch (d) {
    case '0': return 0; // 0000
    case '1': return 1; // 0001
    case '2': return 1; // 0010
    case '3': return 2; // 0011
    case '4': return 1; // 0100
    case '5': return 2; // 0101
    case '6': return 2; // 0110
    case '7': return 3; // 0111
    case '8': return 1; // 1000
    case '9': return 2; // 1001
    case 'a': return 2; // 1010
    case 'b': return 3; // 1011
    case 'c': return 2; // 1100
    case 'd': return 3; // 1101
    case 'e': return 3; // 1110
    case 'f': return 4; // 1111
  }
}

function bitsOn(s) {
  let count = 0;
  for (const d of s) {
    count += bitsOnHexDigit(d);
  }
  return count;
}

let used = 0;
for (let i = 0; i <= 127; i++) {
  const data = `${input}-${i}`;
  const h = knotHash(data);
  used += bitsOn(h);
}

console.log(used);