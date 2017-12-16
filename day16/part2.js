const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const commands = data.split(',');

// let programs = 'abcde';
let programs = 'abcdefghijklmnop';

let indexes = [];
for (let i = 0; i < programs.length; i++) {
  indexes[i] = i;
}
let renames = {};
let renamesReverse = {}
for (let i = 0; i < programs.length; i++) {
  renames[programs[i]] = programs[i];
  renamesReverse[programs[i]] = programs[i];
}

function spin(size) {
  const newIndexes = [];
  let copyFrom = indexes.length - size;
  for (let i = 0; i < indexes.length; i++) {
    newIndexes[i] = indexes[copyFrom];
    copyFrom = (copyFrom + 1) % indexes.length;
  }
  indexes = newIndexes;
}

function swap(a, index0, index1) {
  const temp = a[index0];
  a[index0] = a[index1];
  a[index1] = temp;
}

function exchange(positions) {
  swap(indexes, positions[0], positions[1]);
}

function partner(pair) {
  const name0 = pair[0];
  const name1 = pair[1];
  const renamedToName0 = renamesReverse[name0];
  const renamedToName1 = renamesReverse[name1];
  renames[renamedToName0] = name1;
  renames[renamedToName1] = name0;
  renamesReverse[name0] = renamedToName1;
  renamesReverse[name1] = renamedToName0;
}

function doDance() {
  for (const command of commands) {
    const first = command[0];
    const rest = command.slice(1);
    switch (first) {
      case 's':
        spin(parseInt(rest, 10));
        break;
      case 'x':
        exchange(rest.split('/').map((s) => parseInt(s, 10)));
        break;
      case 'p':
        partner(rest.split('/'));
        break;
    }
  }
}

function applyIndexes(a) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[indexes[i]];
  }
  return result;
}

function applyRenames(a) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = renames[a[i]];
  }
  return result;
}

doDance();
console.log(indexes);
console.log(renames);
let programsArray = programs.split('');
for (let i = 0; i < 1000000000; i++) {
  if (i % 1000000 === 0) {
    console.log(i);
  }
  programsArray = applyIndexes(programsArray);
  programsArray = applyRenames(programsArray);
}
programs = programsArray.join('');
console.log(programs);
