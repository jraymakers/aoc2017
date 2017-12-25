const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

// console.log(lines);

function getGroup(regex, s) {
  return regex.exec(s)[1];
}

const beginState = getGroup(/Begin in state ([A-Z])./, lines.shift());
const numSteps = parseInt(getGroup(/Perform a diagnostic checksum after ([0-9]+) steps./, lines.shift()),10);

console.log(beginState);
console.log(numSteps);

const states = {};
while (lines.length > 0) {
  lines.shift(); // blank
  const stateName = getGroup(/In state ([A-Z]):/, lines.shift());
  lines.shift(); // if 0
  const write0 = parseInt(getGroup(/Write the value ([0-9]+)./, lines.shift()),10);
  const move0 = getGroup(/Move one slot to the (left|right)./, lines.shift());
  const next0 = getGroup(/Continue with state ([A-Z])./, lines.shift());
  lines.shift(); // if 1
  const write1 = parseInt(getGroup(/Write the value ([0-9]+)./, lines.shift()),10);
  const move1 = getGroup(/Move one slot to the (left|right)./, lines.shift());
  const next1 = getGroup(/Continue with state ([A-Z])./, lines.shift());
  states[stateName] = {
    values: [
      {
        write: write0,
        move: move0,
        next: next0
      },
      {
        write: write1,
        move: move1,
        next: next1
      }
    ]
  }
}

const tape = {};
let currentState = beginState;
let currentPos = 0;

for (let i = 0; i < numSteps; i++) {
  const state = states[currentState];
  const currentValue = tape[`_${currentPos}`] || 0;
  const value = state.values[currentValue];
  tape[`_${currentPos}`] = value.write;
  if (value.move === 'left') {
    currentPos--;
  } else {
    currentPos++;
  }
  currentState = value.next;
}

let checksum = 0;
for (const k in tape) {
  checksum += tape[k];
}

console.log(checksum);
// console.log(JSON.stringify(states));


