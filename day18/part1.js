const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

let pc = 0;
let regs = {};
let sound = 0;

function setReg(r,v) {
  regs[r] = v;
}

function value(x) {
  if (/[a-z]/i.test(x)) {
    return regs[x] || 0;
  } else {
    return parseInt(x, 10);
  }
}

function snd(x) {
  sound = value(x);
  console.log(sound);
  pc++;
}

function set(x,y) {
  setReg(x, value(y));
  pc++;
}

function add(x,y) {
  setReg(x, value(x) + value(y));
  pc++;
}

function mul(x,y) {
  setReg(x, value(x) * value(y));
  pc++;
}

function mod(x,y) {
  setReg(x, value(x) % value(y));
  pc++;
}

function rcv(x) {
  if (value(x) !== 0) {
    setReg(x, sound);
    console.log(sound);
    process.exit(0);
  }
  pc++;
}

function jgz(x,y) {
  if (value(x) > 0) {
    pc += value(y);
  } else {
    pc++;
  }
}

const program = [];
for (const line of lines) {
  const parts = line.split(' ');
  switch (parts[0]) {
    case 'snd':
      program.push({
        fn: snd,
        x: parts[1]
      });
      break;
    case 'set':
      program.push({
        fn: set,
        x: parts[1],
        y: parts[2],
      });
      break;
    case 'add':
      program.push({
        fn: add,
        x: parts[1],
        y: parts[2],
      });
      break;
    case 'mul':
      program.push({
        fn: mul,
        x: parts[1],
        y: parts[2],
      });
      break;
    case 'mod':
      program.push({
        fn: mod,
        x: parts[1],
        y: parts[2],
      });
      break;
    case 'rcv':
      program.push({
        fn: rcv,
        x: parts[1]
      });
      break;
    case 'jgz':
      program.push({
        fn: jgz,
        x: parts[1],
        y: parts[2],
      });
      break;
  }
}

while (true) {
  const instruction = program[pc];
  // console.log(instruction);
  instruction.fn(instruction.x, instruction.y);
  // console.log(regs);
}
