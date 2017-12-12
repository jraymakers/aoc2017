const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const connections = {};
for (const line of lines) {
  const parts = line.split(' <-> ');
  const program = parts[0];
  const neighborPrograms = parts[1].split(', ');
  connections[program] = neighborPrograms;
}

const queue = [];
const visited = {};
let numVisited = 0;
queue.push('0');
visited['0'] = true;
numVisited++;
while (queue.length > 0) {
  const program = queue.shift();
  for (const neighbor of connections[program]) {
    if (!visited[neighbor]) {
      queue.push(neighbor);
      visited[neighbor] = true;
      numVisited++;
    }
  }
}
console.log(numVisited);
