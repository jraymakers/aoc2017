const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const regs = {};

function initReg(r) {
  if (!regs[r]) {
    regs[r] = 0;
  }
}

function checkCond(r, op, amt) {
  initReg(r);
  const val = regs[r];
  switch (op) {
    case '>': return val > amt;
    case '<': return val < amt;
    case '>=': return val >= amt;
    case '<=': return val <= amt;
    case '==': return val == amt;
    case '!=': return val != amt;
  }
  return false;
}

function doOp(r, op, amt) {
  initReg(r);
  if (op === 'inc') {
    regs[r] += amt;
  } else  {
    regs[r] -= amt;
  }
  if (regs[r] > max) {
    max = regs[r];
  }
}

let max = -Infinity;

for (const line of lines) {
  const parts = line.split(' if ');
  const firstHalf = parts[0].split(' ');
  const reg = firstHalf[0];
  const op = firstHalf[1];
  const amt = parseInt(firstHalf[2], 10);
  const secondHalf = parts[1].split(' ');
  const condReg = secondHalf[0];
  const condOp = secondHalf[1];
  const condAmt = parseInt(secondHalf[2], 10);
  if (checkCond(condReg, condOp, condAmt)) {
    doOp(reg, op, amt);
  }
}

console.log(max);
