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

function leftPad(s, n) {
  while (s.length < n) {
    s = '0' + s;
  }
  return s;
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
  
  return dense.map((d) => leftPad(d.toString(16),2), 32).join('');
}

function hexDigitToBinary(d) {
  switch (d) {
    case '0': return '0000';
    case '1': return '0001';
    case '2': return '0010';
    case '3': return '0011';
    case '4': return '0100';
    case '5': return '0101';
    case '6': return '0110';
    case '7': return '0111';
    case '8': return '1000';
    case '9': return '1001';
    case 'a': return '1010';
    case 'b': return '1011';
    case 'c': return '1100';
    case 'd': return '1101';
    case 'e': return '1110';
    case 'f': return '1111';
    default: console.log('error'); return 'XXXX';
  }
}

function hexStringToBinary(s) {
  let result = '';
  for (const d of s) {
    result += hexDigitToBinary(d);
  }
  return result;
}

const binaryArrays = [];
for (let i = 0; i <= 127; i++) {
  const data = `${input}-${i}`;
  const h = knotHash(data);
  binaryArrays[i] = hexStringToBinary(h).split('');
}

let color = 1;
for (let i = 0; i <= 127; i++) {
  const a = binaryArrays[i]
  for (let j = 0; j <= 127; j++) {
    if (a[j] === '0') {
      a[j] = 0;
    } else {
      a[j] = color;
      color++;
    }
  }
}

let workLeft = true;
while (workLeft) {
  workLeft = false;
  for (let i = 0; i <= 127; i++) {
    const a = binaryArrays[i];
    for (let j = 0; j <= 127; j++) {
      if (a[j] > 0) {
        if (j > 0 && a[j] < a[j-1]) {
          a[j] = a[j-1];
          workLeft = true;
        }
        if (j < 127 && a[j] < a[j+1]) {
          a[j] = a[j+1];
          workLeft = true;
        }
        if (i > 0) {
          const prev = binaryArrays[i-1];
          if (a[j] < prev[j]) {
            a[j] = prev[j];
            workLeft = true;
          }
        }
        if (i < 127) {
          const next = binaryArrays[i+1];
          if (a[j] < next[j]) {
            a[j] = next[j];
            workLeft = true;
          }
        }
      }
    }
  }
}

let regions = 0;
const seen = [];
for (let i = 0; i <= 127; i++) {
  const a = binaryArrays[i];
  for (let j = 0; j <= 127; j++) {
    const color = a[j];
    if (color > 0 && !seen[color]) {
      seen[color] = true;
      regions++;
    }
  }
}

console.log(regions);
