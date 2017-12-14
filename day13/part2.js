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

function reset() {
  for (const layer of layers) {
    if (layer) {
      layer.position = 1;
      layer.direction = 1;
    }
  }
}

function moveScannersFromStart(steps) {
  for (const layer of layers) {
    if (layer) {
      const extra = steps % ((layer.range - 1) * 2);
      for (let i = 0; i < extra; i++) {
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

function isCaught(delay) {
  reset();
  moveScannersFromStart(delay);
  for (const layer of layers) {
    if (layer) {
      if (layer.position === 1) {
        return true;
      }
    }
    moveScanners();
  }
  return false;
}

let delay = 1;

while (isCaught(delay)) {
  delay++;
  if (delay % 500 == 0) console.log(delay);
}

console.log(delay);
