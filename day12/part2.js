const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const numPrograms = lines.length;
const connections = {};
for (const line of lines) {
  const parts = line.split(' <-> ');
  const program = parts[0];
  const neighborPrograms = parts[1].split(', ');
  connections[program] = neighborPrograms;
}

let numGroups = 0;
const visited = {};

for (const startProgram in connections) {
  if (!visited[startProgram]) {
    numGroups++;
    const queue = [];
    queue.push(startProgram);
    visited[startProgram] = true;
    while (queue.length > 0) {
      const program = queue.shift();
      for (const neighbor of connections[program]) {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      }
    }
  }
}

console.log(numGroups);
