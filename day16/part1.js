const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const commands = data.split(',');

// let programs = 'abcde';
let programs = 'abcdefghijklmnop';
console.log(programs);

function spin(size) {
  const progs = programs.split('');
  const newProgs = [];
  let copyFrom = progs.length - size;
  for (let i = 0; i < progs.length; i++) {
    newProgs[i] = progs[copyFrom];
    copyFrom = (copyFrom + 1) % progs.length;
  }
  programs = newProgs.join('');
}

function swap(progs, index0, index1) {
  const temp = progs[index0];
  progs[index0] = progs[index1];
  progs[index1] = temp;
}

function exchange(positions) {
  const progs = programs.split('');
  swap(progs, positions[0], positions[1]);
  programs = progs.join('');
}

function partner(pair) {
  const progs = programs.split('');
  const index0 = progs.indexOf(pair[0]);
  const index1 = progs.indexOf(pair[1]);
  swap(progs, index0, index1);
  programs = progs.join('');
}

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
  console.log(programs);
}
