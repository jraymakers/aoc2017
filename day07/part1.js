const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const programs = {};

for (const line of lines) {
  const parts = line.split(' -> ');
  const firstParts = parts[0].split(' ');
  const name = firstParts[0];
  if (programs[name] != 'held') {
    programs[name] = 'program';
  }
  const weight = firstParts[1];
  const held = parts[1] ? parts[1].split(', ') : [];
  for (const h of held) {
    programs[h] = 'held';
  }
}
for (const program in programs) {
  if (programs[program] == 'program') {
    console.log(program);
  }
}