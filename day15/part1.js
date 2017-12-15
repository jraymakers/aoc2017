let a = 277;
let b = 349;

// example
// let a = 65;
// let b = 8921;

const aFactor = 16807;
const bFactor = 48271;

const dividend = 2147483647;

function nextA() {
  return a * aFactor % dividend;
}
function nextB() {
  return b * bFactor % dividend;
}

function lowest16BitEqual(p, q) {
  return (p & 0xffff) === (q & 0xffff);
} 

const million = 1000 * 1000;
let count = 0;
for (let i = 0; i < 40 * million; i++) {
  if (i % million === 0) console.log(i);
  a = nextA();
  b = nextB();
  if (lowest16BitEqual(a, b)) {
    count++;
  }
}

console.log(count);
