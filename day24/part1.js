const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const partMap = [];

function addToPartMap(key, part) {
  if (!partMap[key]) {
    partMap[key] = [];
  }
  partMap[key].push(part);
}

for (const line of lines) {
  const splitLine = line.split('/');
  const n0 = parseInt(splitLine[0], 10);
  const n1 = parseInt(splitLine[1], 10);
  const part = {
    ports: [n0, n1].sort(),
    hash: `${n0}_${n1}`
  };
  addToPartMap(n0, part);
  addToPartMap(n1, part);
}

// console.log(partMap);

let max = -Infinity;

function getBridgesStartingWith(bridge, port) {
  const nextParts = partMap[port];
  let foundNext = false;
  for (const nextPart of nextParts) {
    if (!bridge.usedParts[nextPart.hash]) {
      foundNext = true;
      const nextPort = nextPart.ports[0] === port ? nextPart.ports[1] : nextPart.ports[0];
      const newBridge = {
        path: bridge.path.concat(nextPart),
        usedParts: { ...bridge.usedParts, [nextPart.hash]: true },
        strength: bridge.strength + nextPort * 2
      };
      getBridgesStartingWith(newBridge, nextPort);
    }
  }
  if (!foundNext) {
    bridge.strength -= port;
    if (bridge.strength > max) {
      max = bridge.strength;
      console.log(bridge);
    }
  }
}

getBridgesStartingWith({
  path: [],
  usedParts: {},
  strength: 0,
}, 0);
