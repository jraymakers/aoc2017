const input = 382;

const maxInsert = 50 * 1000 * 1000;

const valueAfter = [];
valueAfter.length = maxInsert + 1;
for (let i = 0; i <= maxInsert; i++) {
  valueAfter[i] = i;
}
let current = 0;

for (let i = 1; i <= maxInsert; i++) {
  if (i % 10000 === 0) console.log(i);
  let steps = input % i;
  while (steps > 0) {
    current = valueAfter[current];
    steps--;
  }
  const nextValue = valueAfter[current];
  valueAfter[current] = i;
  valueAfter[i] = nextValue;
  current = i;
}

console.log(valueAfter[0]);
