const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const layers = [];
for (const line of lines) {
  const parts = line.split(': ');
  const depth = parseInt(parts[0], 10);
  const range = parseInt(parts[1], 10);
  layers[depth] = {
    depth: depth,
    range: range,
    position: 1,
    direction: 1,
  };
}



function moveScanners() {
  for (const layer of layers) {
    if (layer) {
      if (layer.direction > 0) {
        layer.position++;
        if (layer.position === layer.range) {
          layer.direction = -1;
        }
      } else {
        layer.position--;
        if (layer.position === 1) {
          layer.direction = 1;
        }
      }
    }
  }
}

let severity = 0;
for (const layer of layers) {
  if (layer) {
    if (layer.position === 1) {
      severity += layer.depth * layer.range;
    }
  }
  moveScanners();
}

console.log(severity);
