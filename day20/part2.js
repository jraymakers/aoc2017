const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const lineRegex = /^p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>$/;
const particles = [];
for (const line of lines) {
  const matches = lineRegex.exec(line);
  if (!matches || matches.length < 10) {
    console.log('ERROR');
    console.log(matches);
    process.exit(1);
  }
  const particle = {
    p: {
      x: parseInt(matches[1], 10),
      y: parseInt(matches[2], 10),
      z: parseInt(matches[3], 10),
    },
    v: {
      x: parseInt(matches[4], 10),
      y: parseInt(matches[5], 10),
      z: parseInt(matches[6], 10),
    },
    a: {
      x: parseInt(matches[7], 10),
      y: parseInt(matches[8], 10),
      z: parseInt(matches[9], 10),
    }
  };
  particle.dist = dist(particle);
  particles.push(particle);
}

function dist(part) {
  return Math.abs(part.p.x) + Math.abs(part.p.y) + Math.abs(part.p.z) ;
}

const removed = [];
let particlesLeft = particles.length;

while (true) {
  let minDist = Infinity;
  let minDistIndex = -1;
  const positions = {};
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    if (!removed[i]) {
      particle.v.x += particle.a.x;
      particle.v.y += particle.a.y;
      particle.v.z += particle.a.z;
      particle.p.x += particle.v.x;
      particle.p.y += particle.v.y;
      particle.p.z += particle.v.z;
      const pos = `${particle.p.x}_${particle.p.y}_${particle.p.z}`;
      if (!positions[pos]) {
        positions[pos] = [i];
      } else {
        positions[pos].push(i);
      }
      particle.dist = dist(particle);
      if (particle.dist < minDist) {
        minDist = particle.dist;
        minDistIndex = i;
      }
    }
  }
  for (const pos in positions) {
    const indexes = positions[pos];
    if (indexes.length > 1) {
      for (const index of indexes) {
        if (!removed[index]) {
          removed[index] = true;
          particlesLeft--;
        }
      }
    }
  }
  console.log(`${minDistIndex}: ${minDist} (${particlesLeft})`);
}