const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

function rotate(input) {
  if (input.length === 2) {
    return [
      `${input[1][0]}${input[0][0]}`,
      `${input[1][1]}${input[0][1]}`
    ];
  } else if (input.length === 3) {
    return [
      `${input[2][0]}${input[1][0]}${input[0][0]}`,
      `${input[2][1]}${input[1][1]}${input[0][1]}`,
      `${input[2][2]}${input[1][2]}${input[0][2]}`
    ];
  } else {
    console.log('rotate error');
  }
}

function flipH(input) {
  if (input.length === 2) {
    return [
      `${input[0][1]}${input[0][0]}`,
      `${input[1][1]}${input[1][0]}`
    ];
  } else if (input.length === 3) {
    return [
      `${input[0][2]}${input[0][1]}${input[0][0]}`,
      `${input[1][2]}${input[1][1]}${input[1][0]}`,
      `${input[2][2]}${input[2][1]}${input[2][0]}`
    ];
  } else {
    console.log('flipH error');
  }
}

function flipV(input) {
  if (input.length === 2) {
    return [
      input[1],
      input[0]
    ];
  } else if (input.length === 3) {
    return [
      input[2],
      input[1],
      input[0]
    ];
  } else {
    console.log('flipV error');
  }
}

const rules = {};
for (const line of lines) {
  const parts = line.split(' => ');
  const input = parts[0].split('/');
  const output = parts[1].split('/');

  let x = input;
  rules[x] = output;
  rules[flipH(x)] = output;
  rules[flipV(x)] = output;
  rules[flipV(flipH(x))] = output;
  x = rotate(x);
  rules[x] = output;
  rules[flipH(x)] = output;
  rules[flipV(x)] = output;
  rules[flipV(flipH(x))] = output;
  x = rotate(x);
  rules[x] = output;
  rules[flipH(x)] = output;
  rules[flipV(x)] = output;
  rules[flipV(flipH(x))] = output;
  x = rotate(x);
  rules[x] = output;
  rules[flipH(x)] = output;
  rules[flipV(x)] = output;
  rules[flipV(flipH(x))] = output;
}

console.log(rules);

let pattern = [
  '.#.',
  '..#',
  '###',
];

function enhance(n) {
  const len = pattern.length;
  const squares = len/n;
  console.log(`enhance ${n} ${len} ${squares}`);
  const enhanced = [];
  for (let r = 0; r < squares; r++) {
    for (let c = 0; c < squares; c ++) {
      const inR = r*n;
      const inC = c*n;
      const outR = r*(n+1);
      const outC = c*(n+1);
      let inputArray = [];
      for (let i = 0; i < n; i++) {
        inputArray.push(pattern[inR+i].substr(inC, n))
      }
      const input = inputArray.join(',');
      const output = rules[input];
      if (!output) {
        console.log(`no output for input ${input}`);
      }
      for (let i = 0; i < (n+1); i++) {
        if (!enhanced[outR+i]) {
          enhanced[outR+i] = [];
        }
        enhanced[outR+i].push(output[i]);
      }
    }
  }
  for (let i = 0; i < enhanced.length; i++) {
    enhanced[i] = enhanced[i].join('');
  }
  return enhanced;
}

console.log(`-- 0 --`);
console.log(pattern.join('\n'));
for (let i = 0; i < 5; i++) {
  console.log(`${i} start`);
  if (pattern.length % 2 === 0) {
    pattern = enhance(2);
  } else if (pattern.length % 3 === 0) {
    pattern = enhance(3);
  } else {
    console.log('pattern size error');
  }
  console.log(`${i} done`);
  console.log(pattern.join('\n'));
}

let count = 0;
for (const line of pattern) {
  for (const c of line) {
    if (c === '#') count++;
  }
}

console.log(count);
