const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const programs = {};

for (const line of lines) {
  const parts = line.split(' -> ');
  const firstParts = parts[0].split(' ');
  const name = firstParts[0];
  const weight = parseInt(firstParts[1].substr(1, firstParts[1].length - 2), 10);
  const heldPrograms = parts[1] ? parts[1].split(', ') : null;
  if (!programs[name]) {
    programs[name] = {};
  }
  programs[name].weight = weight;
  programs[name].heldPrograms = heldPrograms;
  if (heldPrograms) {
    for (const held of heldPrograms) {
      if (!programs[held]) {
        programs[held] = {};
      }
      programs[held].held = true;
    }
  }
}

function bottom() {
  for (const program in programs) {
    if (!programs[program].held) {
      return programs[program];
    }
  }
}

function calcWeight(program) {
  if (program.heldPrograms) {
    const heldPrograms = program.heldPrograms;
    const heldWeights = [];
    const weightCounts = {};
    let sumHeld = 0;
    for (let i = 0; i < heldPrograms.length; i++) {
      const heldProgram = heldPrograms[i];
      const w = calcWeight(programs[heldProgram]);
      heldWeights[i] = w;
      sumHeld += w;
      if (!weightCounts[`_${w}`]) {
        weightCounts[`_${w}`] = 1;
      } else {
        weightCounts[`_${w}`] += 1;
      }
    }
    let badIndex = null;    
    let desiredWeight = null;
    for (let i = 0; i < heldWeights.length; i++) {
      const heldWeight = heldWeights[i];
      if (weightCounts[`_${heldWeight}`] === 1) {
        badIndex = i
      } else {
        desiredWeight = heldWeight;
      }
    }
    if (badIndex !== null) {
      const over = heldWeights[badIndex] - desiredWeight;
      const actual = programs[heldPrograms[badIndex]].weight;
      console.log(actual - over);
      process.exit(0);
    }
    return program.weight + sumHeld;
  } else {
    return program.weight;
  }
}

calcWeight(bottom());
